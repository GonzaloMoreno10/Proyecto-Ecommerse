import { Request, Response } from 'express';
import { mongoCarritoRepository, mongoProductRepository, mongoUserRepository } from '../repositories/mongo';
import { compra, compraWhatSapp } from '../utils/MailStructure';
import { GmailService } from '../services/gmail';
import { SmsService } from '../services/twilio';
class CarritoController {
  async findById(req: Request, res: Response) {
    try {
      let user = req.params.userId;

      if (user !== 'null') {
        if (req.params.idProducto) {
          let idProducto = req.params.idProducto;
          let data = await mongoCarritoRepository.findProductsOnCartById(idProducto, user);
          if (data) {
            res.json(data);
          } else {
            res.json('nada');
          }
        } else {
          let cart = await mongoCarritoRepository.findCartByUser(user);
          if (!cart) await mongoCarritoRepository.createCart(cart._id);
          let productos = await mongoCarritoRepository.findProductsOnCart(user);
          let conteo = 0;
          let cantidad = 0;
          for (let i in productos) {
            conteo += productos[i].precioTotal ? productos[i].precioTotal : productos[i].precio;
            cantidad++;
          }
          let total = conteo.toFixed(2);
          console.log(productos);
          res.json({ productos, total });
        }
      } else {
        console.log(null);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let { userId } = req.params;
      let { cantidad } = req.body;
      console.log(cantidad);
      console.log(userId);
      let existeCarrito = await mongoCarritoRepository.findCartByUser(userId);
      if (!existeCarrito) {
        await mongoCarritoRepository.createCart(userId);
      }
      let idProd = req.params.idProd;
      let existInCart = await mongoCarritoRepository.findProductsOnCartById(idProd, userId);
      if (existInCart) {
        return res.status(409).json('Producto existente en el carrito');
      }

      const product = await mongoCarritoRepository.addProductsToCart(idProd, cantidad, userId);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async compra(req: Request, res: Response) {
    //let user = Object.assign(req.user);
    let { userId } = req.params;
    let usuario = await mongoUserRepository.findById(userId);
    let carrito = await mongoCarritoRepository.findCartByUser(userId);
    let products = await mongoCarritoRepository.findProductsOnCart(userId);

    let suma = 0;
    for (let i in products) {
      suma += products[i].precio;
    }
    let total = suma.toFixed(3);

    try {
      await GmailService.sendEmail(usuario.email, 'Nueva compra', compra(products, usuario, total));
      carrito.productos = [];
      await SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');

      await SmsService.sendWhatSapp('+5493548574529', compraWhatSapp(products, usuario, total));

      await mongoCarritoRepository.vaciarCarrito(userId);
      return res.status(200).json('ok');
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    let { userId } = req.params;

    let idProducto = req.params.idProducto;

    try {
      let prod = await mongoProductRepository.findById(idProducto);
      if (prod) {
        const productDelete = await mongoCarritoRepository.deleteProductsOnCart(idProducto, userId);
        return res.status(202).json(productDelete);
      } else {
        return res.status(400).json('Producto no existente');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export const carritoController = new CarritoController();
