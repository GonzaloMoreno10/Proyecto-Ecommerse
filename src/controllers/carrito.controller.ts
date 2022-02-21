import { Request, Response } from 'express';
import {
  mongoCarritoRepository,
  mongoProductRepository,
  mongoUserRepository,
  orderRepository,
} from '../repositories/mongo';
import { compra, compraWhatSapp } from '../utils/MailStructure';
import { GmailService } from '../services/gmail';
import { SmsService } from '../services/twilio';
import { Orden } from '../interface/orden.interface';
class CarritoController {
  async findById(req: Request, res: Response) {
    try {
      let { userId } = req.params;
      if (userId !== 'null') {
        if (req.params.idProducto) {
          let { idProducto } = req.params;
          let data = await mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(404).json('Producto no existente en el carrito');
          }
        } else {
          let existUser = await mongoUserRepository.findById(userId);
          if (existUser) {
            let cart = await mongoCarritoRepository.findCartByUser(userId);
            if (!cart) await mongoCarritoRepository.createCart(cart._id);
            let productos = await mongoCarritoRepository.findProductsOnCart(userId);
            let conteo = 0;
            let cantidad = 0;
            for (let i in productos) {
              conteo += productos[i].precioTotal ? productos[i].precioTotal : productos[i].precio;
              cantidad++;
            }
            let total = conteo.toFixed(2);
            res.status(200).json({ productos, total });
          } else {
            res.status(404).json('Usuario no encontrado');
          }
        }
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let { userId } = req.params;
      let { idProducto } = req.params;
      let existeCarrito = await mongoCarritoRepository.findCartByUser(userId);
      let existProd = await mongoProductRepository.findById(idProducto);
      if (!existProd) {
        return res.status(404).json('Producto no existente');
      }
      if (!existeCarrito) {
        await mongoCarritoRepository.createCart(userId);
      }

      let existInCart = await mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
      if (existInCart) {
        return res.status(404).json('Producto existente en el carrito');
      }

      await mongoCarritoRepository.addProductsToCart(idProducto, userId);

      return res.status(201).json('Producto agregado al carrito');
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async compra(req: Request, res: Response) {
    const { carrito, userId } = req.body;
    let suma = 0;
    for (let i in carrito) {
      suma += carrito[i].price;
    }

    try {
      const user = await mongoUserRepository.findById(userId);
      const orders = await orderRepository.findAll();
      const timestamp = new Date();
      let nroOrden = orders.length + 1;
      let order: Orden = {
        items: carrito,
        nroOrden,
        timestamp,
        estado: 1,
        email: user.email,
        userId,
        precioOrden: suma,
      };
      let orden = await orderRepository.createOrder(order);

      //Comentado por que alcance la cuota limite de email
      //await GmailService.sendEmail(usuario.email, 'Nueva compra', compra(products, usuario, total));
      //carrito.productos = [];
      // await SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');

      // await SmsService.sendWhatSapp('+5493548574529', compraWhatSapp(carrito, userId, suma.toString()));

      // await mongoCarritoRepository.vaciarCarrito(userId);
      return res.status(200).json(orden);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    let { userId } = req.params;
    let { idProducto } = req.params;
    try {
      let prod = await mongoProductRepository.findById(idProducto);
      if (prod) {
        let product = await mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
        if (product) {
          await mongoCarritoRepository.deleteProductsOnCart(idProducto, userId);
          return res.status(202).json('Producto eliminado');
        } else {
          return res.status(404).json('El producto no se encuentra en el carrito');
        }
      } else {
        return res.status(404).json('Producto no existente');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export const carritoController = new CarritoController();
