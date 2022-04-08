import { Request, Response } from 'express';
import { IProduct, IProperty } from '../interface/producto.inteface';
import { categoriaRepository } from '../repositories/mongo/categoria.repository';
import { ProductQueryInterface } from '../interface';
import { mysqlProductRepository } from '../repositories/mysql/productRepository';
import { propertiesRepository } from '../repositories/mysql/propertiesRepository';
import { IProductPresentationProperty } from '../interface/properties';
import { HEROKU } from '../constantes/venv';

export class ProductoController {
  async getRelatedProduct(req: Request, res: Response) {
    try {
      const { id, categoria, marca, productType } = req.query;
      const result = await mysqlProductRepository.getRelatedProducts(
        Number(id),
        Number(categoria),
        Number(marca),
        Number(productType)
      );
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsByProductType(req: Request, res: Response) {
    try {
      const { productType } = req.params;
      let products = await mysqlProductRepository.getProductsByProductType(parseInt(productType));
      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        const finalArray = [];
        let product = await mysqlProductRepository.getProductsById(parseInt(id));
        if (product[0]) {
          let prop: any = {};
          let properties = await mysqlProductRepository.findProductProperties(parseInt(id));
          properties.forEach(property => {
            const propertyName = property.propertyName;
            if (!prop[propertyName]) prop[propertyName] = [];
            prop[propertyName].push(property);
          });
          for (let i in prop) {
            const subProperties = [];

            for (const j in prop[i]) {
              subProperties.push({
                subPropertyId: prop[i][j].ppsiId,
                subPropertyName: prop[i][j].subPropertyName,
                ppvId: prop[i][j].ppvId,
                value: prop[i][j].value,
              });
            }
            const properties: IProperty = {
              propertyId: prop[i][0].ppId,
              isGeneric: prop[i][0].isGeneric,
              propertyName: prop[i][0].propertyName,
              subProperties,
            };
            finalArray.push(properties);
          }
          product[0].properties = finalArray;
        }

        product ? res.json(product) : res.status(404).json('Product not found');
      } else {
        res.status(400).json('Invalid Field: id');
        console.log('id');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findByCategoria(req: Request, res: Response) {
    let { categoriaId } = req.params;
    try {
      if (categoriaId) {
        const productos = await mysqlProductRepository.getProductsQuery({ categoria: categoriaId });

        return res.status(200).json(productos);
      } else {
        return res.status(400).json('Invalid params');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { categoria, nombre, minPrice, maxPrice, codigo, minStock, maxStock, marca, productType } = req.query;
      const query: ProductQueryInterface = {};
      if (nombre) query.nombre = nombre.toString();
      if (codigo) query.codigo = Number(codigo);
      if (minPrice) query.minPrice = Number(minPrice);
      if (maxPrice) query.maxPrice = Number(maxPrice);
      if (minStock) query.minStock = Number(minStock);
      if (maxStock) query.maxStock = Number(maxStock);
      if (categoria) query.categoria = categoria.toString();
      if (marca) query.marca = Number(marca);
      if (productType) query.productType = Number(marca);
      let data = await mysqlProductRepository.getProductsQuery(query);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        productType,
        marca,
        properties,
        isOferta,
        descuento,
        fotos,
      } = req.body;
      let producto: IProduct = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        productTypeId: productType,
        isOferta,
        descuento,
        marcaId: marca,
        properties,
        fotos,
      };

      console.log(producto);
      //let cat = await categoriaRepository.getCategoriasById(categoria);
      //if (cat) {
      let result = await mysqlProductRepository.setProduct(producto);

      if (result) {
        if (properties) {
          for (const i in properties) {
            const propertie: IProductPresentationProperty = {
              productId: result,
              productPropertieValueId: properties[i],
            };
            await propertiesRepository.setProductPresentationProperty(propertie);
          }
        }
        const producto: IProduct = await mysqlProductRepository.getProductPresentationById(result);
        return res.status(200).json(producto);
      }

      // } else {
      //res.status(400).json('Categoria no existente');
      //}
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca } = req.body;
      let producto: IProduct = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
        categoria,
        productTypeId: productType,
        marcaId: marca,
      };

      let prod = await mysqlProductRepository.getProductsById(parseInt(id));
      if (prod) {
        let data = await mysqlProductRepository.updateProduct(producto, parseInt(id));
        let productToRes = await mysqlProductRepository.getProductsById(parseInt(id));
        res.status(200).json({ result: 'Producto Actualizado', productToRes });
      } else {
        res.status(400).json('Producto no encontrado');
      }
    } catch (err) {
      return res.json(err);
    }
  }

  async find(req: Request, res: Response) {
    const { search } = req.params;
    try {
      const products = await mysqlProductRepository.findByKeyWord(search);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);
      let prod = await mysqlProductRepository.getProductsById(id);
      if (prod) {
        await propertiesRepository.deletePropertiesByProduct(id);
        await mysqlProductRepository.deleteProduct(id);
        res.status(202).json({
          msg: 'producto borrado',
        });
      } else {
        res.status(400).json('Producto no encontrado');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async setImage(req: Request, res: Response) {
    //const { fileName } = req.params;
    const { file } = req;
    console.log(file.originalname);
    //const { productId } = req.params;
    //console.log(productId);
    let dir = '';
    if (HEROKU) {
      dir = `https://ecommerce-be-01.herokuapp.com/storage/imgs/${file.originalname}.jpg`;
    } else {
      dir = `http://localhost:3000/storage/imgs/${file.originalname}.jpg`;
    }

    console.log(dir);

    //console.log(product);
    //product.foto = dir;
    try {
      //await mysqlProductRepository.updatePicture(parseInt(productId), dir);
      //const updateProduct = await mysqlProductRepository.getProductsById(parseInt(productId));
      return res.status(200).json(dir);
    } catch (err) {
      return res.json(err);
    }
  }
}

export const productoController = new ProductoController();
