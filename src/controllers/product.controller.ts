import { Request, Response } from 'express';
import { INewProduct, IProduct, IProductRelations } from '../interface/product.interface';
import { productRepository } from '../repositories/product.repository';
import { productPropertyRepository } from '../repositories/productProperties.repository';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
} from '../interface/productPresentationProperty.interface';
import { HEROKU } from '../constants/venv';
import { IBrandModelLine, INewBrandModelLine } from '../interface/brandModelLine.interface';
import { brandModelLineRepository } from '../repositories/brandModelLine.repository';
import { constructResponse } from '../utils/constructResponse';
import { IError } from '../interface/response.interface';

export class ProductoController {
  async getRelatedProduct(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const result = await productRepository.getProductsRelatedById(Number(id));
      return constructResponse(122, res, result);
    } catch (err) {
      console.log(err);
      return res.status(200).json(constructResponse(200, null, err));
    }
  }

  async getProductsByOrdersUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await productRepository.getProductsByLastOrdersUser(parseInt(userId));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getOffers(req: Request, res: Response) {
    try {
      const result = await productRepository.getProductsInOffers();
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  async getProductsByProductType(req: Request, res: Response) {
    try {
      const { productType } = req.params;
      let products = await productRepository.getProductsByProductType(parseInt(productType));
      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        let product = await productRepository.getProductsById(parseInt(id));
        if (product) {
          console.log(product.ProId);
          const properties = await productPropertyRepository.getPropertiesByProductId(product.ProId);
          Object.assign(product).dataValues.PPPROs = properties;
          return constructResponse(121, res, product);
        } else {
          return constructResponse(123, res);
        }
      } else {
        const error: IError = {
          code: 500,
          message: 'Invalid product id',
        };
        res.status(400).json(constructResponse(400, null, error));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsByMarca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Bad Request' });
      }
      const result = await productRepository.getProductsByBrand(parseInt(id));
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getBySellerUser(req: Request, res: Response) {
    try {
      let { userId, activo } = req.params;
      if (userId) {
        const finalArray = [];
        let product = await productRepository.getProductsBySellerUser(parseInt(userId), parseInt(activo));
        product ? res.json(product) : res.status(404).json('Product not found');
      } else {
        res.status(400).json('Invalid user id');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findByCategoria(req: Request, res: Response) {
    let { categoriaId } = req.params;
    try {
      if (categoriaId) {
        const productos = await productRepository.getProductsByCategoryId(parseInt(categoriaId));

        return res.status(200).json(productos);
      } else {
        return res.status(400).json('Invalid params');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async get(_, res: Response) {
    try {
      const result: IProductRelations[] = await productRepository.getProducts();
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let {
        ProName,
        ProDesc,
        ProCod,
        ProPrice,
        ProStock,
        ProCatId,
        ProTypId,
        BraId,
        ModId,
        LinId,
        properties,
        ProIsOffer,
        ProDiscount,
        ProImgs,
      } = req.body;
      const marcaModeloLinea: INewBrandModelLine = {
        BmlBraId: BraId,
        BmlModId: ModId,
        BmlLinId: LinId,
        createdUser: res.locals.userData.id,
      };

      //let cat = await categoriaRepository.getCategoriasById(categoria);
      //if (cat) {
      const marcaModeloLineaId = await brandModelLineRepository.setBrandModelLine(marcaModeloLinea);
      const producto: INewProduct = {
        ProName,
        ProDesc,
        ProCod,
        ProPrice,
        ProUsrId: res.locals.userData.userId,
        ProStock,
        ProCatId,
        ProBraId: BraId,
        ProTypId,
        ProIsOffer,
        ProDiscount,
        ProBmlId: marcaModeloLineaId.BmlBraId,
        createdUser: res.locals.userData.userId,
        //properties,
        ProImgs,
      };

      const result = await productRepository.setProduct(producto);

      if (result) {
        if (properties) {
          for (const i in properties) {
            const propertie: INewProductPresentationProperty = {
              PreProId: result.ProId,
              PreValId: properties[i],
              createdUser: res.locals.userData.id,
            };
            //await productPropertyRepository.setProductPresentationProperty(propertie);
          }
        }
        const producto = await productRepository.getProductsById(result.ProId);
        const prop = await productPropertyRepository.getPropertiesByProductId(producto.ProId);
        Object.assign(producto).dataValues.properties = prop;
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
      let { ProName, ProDesc, ProCod, ProPrice, ProStock, ProCatId, ProTypId, ProBraId } = req.body;
      let producto: Partial<IProduct> = {
        ProName,
        ProDesc,
        ProCod,
        ProPrice,
        ProStock,
        ProCatId,
        ProTypId,
        ProBraId,
      };

      let prod = await productRepository.getProductsById(parseInt(id));
      if (prod) {
        let data = await productRepository.updProduct(producto, parseInt(id));
        let productToRes = await productRepository.getProductsById(parseInt(id));
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
      const products = await productRepository.getProductsByKeyWord(search);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async borrar(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);
      let prod = await productRepository.getProductsById(id);
      if (prod) {
        //await productPropertyRepository.deletePropertiesByProduct(id);
        await productRepository.delProduct(id, res.locals.userData.userId);
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
    //const { productId } = req.params;
    //console.log(productId);
    let dir = '';
    if (HEROKU) {
      dir = `https://ecommerce-be-01.herokuapp.com/storage/imgs/${file.originalname}.jpg`;
    } else {
      dir = `http://localhost:3000/storage/imgs/${file.originalname}.jpg`;
    }

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
