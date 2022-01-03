import { Request, Response } from 'express';
import { orderRepository } from '../repositories/mongo';
import { Orden } from '../interface/orden.interface';
import { mensajeRepository } from '../repositories/mongo/mensajeRepository';
class MensajesController {
  async getByEmail(req: Request, res: Response) {
    let { email } = req.params;
    let mensajes = await mensajeRepository.getMensajesByEmail(email);
    res.json(mensajes);
  }
}

export const mensajesController = new MensajesController();
