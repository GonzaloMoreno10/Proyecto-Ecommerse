// import Server from 'socket.io';
// import { normalize, schema } from 'normalizr';
// import { IAutor, IMensaje } from '../interface/mensaje.interface';
// import { mensajeRepository } from '../repositories/mongo/mensajeRepository';
// export const initIo = async server => {
//   // let mensajes = await getMensajes(archMessg);
//   const io = new Server(server);
//   io.on('connection', async socket => {
//     console.log(socket.id);
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
//       console.log(data);
//       // let frase = mensaje.texto.split(' ');
//       // if (frase.includes('stock')) {
//       //   socket.emit('mensajes', 'Tenemos stock');
//       // }
//       // if (frase.includes('envio')) {
//       //   socket.emit('mensajes', 'Gratis');
//       // }
//       // if (frase.includes('metodo de pago')) {
//       //   socket.emit('mensajes', 'Credito, debito,efectivo');
//       // }
//       //await mensajeRepository.createMensaje(mensaje);
//       let mensajes = (await mensajeRepository.getAllMensajes()).map(data => ({
//         _id: data._id,
//         author: data.author,
//         text: data.texto,
//         avatar: data.author.avatar,
//         date: data.fecha,
//       }));
//       let msjNormalize = normalize(mensajes, msgSchema);
//       //console.log (util.inspect (msjNormalize, true, 7, true));
//       io.emit('mensajes', msjNormalize);
//     });
//     socket.on('askMensajes', async data => {
//       let mensajes = (await mensajeRepository.getAllMensajes()).map(data => ({
//         _id: data._id,
//         author: data.author,
//         text: data.texto,
//         avatar: data.author.avatar,
//         date: data.fecha,
//       }));
//       let msjNormalize = normalize(mensajes, msgSchema);
//       //console.log (util.inspect (msjNormalize, true, 7, true));
//       socket.emit('mensajes', msjNormalize);
//     });
//   });
// };
