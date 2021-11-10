import express from 'express';
import { Request, Response } from 'express';
const Router = express.Router();
import { mongoCarritoRepository, mongoProductRepository, mongoUserRepository } from '../repositories/mongo';
import { compra, compraWhatSapp } from '../utils/MailStructure';
import { GmailService } from '../services/gmail';
import { SmsService } from '../services/twilio';

class CarritoController {
  async findById(req: Request, res: Response) {
    try {
      let user = Object.assign(req.user);
      if (req.params.idProducto) {
        let idProducto = req.params.idProducto;
        let data = await mongoCarritoRepository.findProductsOnCartById(idProducto, user._id);
        console.log(data);
        if (data) {
          res.json(data);
        } else {
          res.json('nada');
        }
      } else {
        let cart = await mongoCarritoRepository.findCartByUser(user._id);
        if (!cart) await mongoCarritoRepository.createCart(user._id);
        let productos = await mongoCarritoRepository.findProductsOnCart(user._id);
        let conteo = 0;
        let cantidad = 0;
        for (let i in productos) {
          conteo += productos[i].precio;
          cantidad++;
        }
        let total = conteo.toFixed(2);
        if (productos) {
          res.render('carritos/allCarrito', { productos, total, cantidad });
        } else {
          res.render('carritos/allCarrito');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async agregar(req: Request, res: Response) {
    try {
      let user = Object.assign(req.user);
      let existeCarrito = await mongoCarritoRepository.findCartByUser(user._id);
      if (!existeCarrito) {
        await mongoCarritoRepository.createCart(user._id);
      }
      let idProd = req.params.idProd;
      let existInCart = await mongoCarritoRepository.findProductsOnCartById(idProd, user._id);
      if (existInCart) {
        req.flash('error_msg', 'El producto ya esta en el carrito');
        return res.redirect('/api/carrito');
      }
      let existsProd = await mongoProductRepository.findById(idProd);
      if (existsProd) {
        await mongoCarritoRepository.addProductsToCart(idProd, user._id);
        req.flash('success_msg', 'Producto agregado al carrito');
        res.redirect('/api/productos');
      } else {
        req.flash('error_msg', 'Ocurrio un error');
        res.redirect('/api/productos');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async compra(req: Request, res: Response) {
    let user = Object.assign(req.user);
    let usuario = await mongoUserRepository.findById(user._id);
    let carrito = await mongoCarritoRepository.findCartByUser(user._id);
    let products = await mongoCarritoRepository.findProductsOnCart(user._id);

    let suma = 0;
    for (let i in products) {
      suma += products[i].precio;
    }
    let total = suma.toFixed(3);

    await GmailService.sendEmail(usuario.email, 'Nueva compra', compra(products, usuario, total));
    carrito.productos = [];
    await SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');

    await SmsService.sendWhatSapp('+5493548574529', compraWhatSapp(products, usuario, total));

    await mongoCarritoRepository.vaciarCarrito(user._id);
    req.flash('success_msg', 'Pedido Realizado correctamente');
    res.redirect('/api/productos');
  }

  async delete(req: Request, res: Response) {
    let user = Object.assign(req.user);
    let idProducto = req.params.idProducto;
    try {
      let prod = await mongoProductRepository.findById(idProducto);
      if (prod) {
        await mongoCarritoRepository.deleteProductsOnCart(idProducto, user._id);
        req.flash('success_msg', 'Producto removido del carrito');
        res.redirect('/api/carrito');
      } else {
        req.flash('error_msg', 'Ocurrio un problema');
        res.redirect('/api/carrito');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const carritoController = new CarritoController();
