import mongoose, { Schema } from 'mongoose';
import { IMensaje } from '../../interface/mensaje.interface';
import { IUser } from '../../models/user.model';

const mensajesSchema = new Schema({
  author: {
    id: String,
    email: String,
    nombre: String,
    edad: Number,
    avatar: String,
  },
  texto: String,
  fecha: Date,
});

class MensajeRepository {
  private mensajes: any;
  constructor() {
    this.mensajes = mongoose.model<IMensaje>('mensajes', mensajesSchema);
  }

  async getAllMensajes() {
    return await this.mensajes.find();
  }

  async getMensajesByEmail(email: string) {
    return await this.mensajes.find({ 'author.email': email });
  }

  async createMensaje(mensaje) {
    let newMensaje = new this.mensajes(mensaje);
    let res = await newMensaje.save();
    return res;
  }
}

export const mensajeRepository = new MensajeRepository();
