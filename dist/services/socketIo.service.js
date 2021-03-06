// import * as socketio from 'socket.io';
// import { normalize, schema } from 'normalizr';
// import { IAutor, IMensaje } from '../interface/message.interface';
// import { mensajeRepository } from '../repositories/mongo/mensajeRepository';
// import * as http from 'http';
// export const initIo = async (server: http.Server) => {
//   // let mensajes = await getMensajes(archMessg);
//   const io = require('socket.io')(server, {
//     cors: true,
//     transports: ['polling'],
//   });
//   io.on('connection', async socket => {
//     const author = new schema.Entity('author', {}, { idAttribute: 'id' });
//     const msg = new schema.Entity(
//       'mensajes',
//       {
//         author: author,
//       },
//       {
//         idAttribute: '_id',
//       }
//     );
//     const msgSchema = new schema.Array(msg);
//     socket.on('mensajes', async data => {
//       const author: IAutor = {
//         id: data.author.id,
//         nombre: data.author.nombre,
//         edad: data.author.edad,
//         avatar: data.author.avatar,
//         email: data.author.email,
//       };
//       let mensaje: IMensaje = {
//         author,
//         texto: data.message,
//         fecha: new Date(),
//       };
//       let res = undefined;
//       if (mensaje.texto) {
//         let frase = mensaje.texto.split(' ');
//         if (frase.includes('stock')) {
//           socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Tenemos stock' });
//           res = { author: { nombre: 'admin' }, texto: 'Tenemos stock' };
//         }
//         if (frase.includes('envio')) {
//           socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Gratis' });
//           res = { author: { nombre: 'admin' }, texto: 'Gratis' };
//         }
//         if (frase.includes('metodo de pago')) {
//           socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Credito, debito,efectivo' });
//           res = { author: { nombre: 'admin' }, texto: 'Credito, debito,efectivo' };
//         }
//         await mensajeRepository.createMensaje(mensaje);
//         if (res) {
//           await mensajeRepository.createMensaje(res);
//         }
//       }
//       let mensajes = await mensajeRepository.getAllMensajes();
//       io.emit('mensajes', mensajes);
//     });
//     socket.on('askMensajes', async data => {
//       let mensajes = await mensajeRepository.getAllMensajes();
//       socket.emit('mensajes', mensajes);
//     });
//   });
// };
