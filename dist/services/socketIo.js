"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIo = void 0;
const normalizr_1 = require("normalizr");
const mensajeRepository_1 = require("../repositories/mongo/mensajeRepository");
const initIo = (server) => __awaiter(void 0, void 0, void 0, function* () {
    // let mensajes = await getMensajes(archMessg);
    const io = require('socket.io')(server, {
        cors: true,
        transports: ['polling'],
    });
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const author = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'id' });
        const msg = new normalizr_1.schema.Entity('mensajes', {
            author: author,
        }, {
            idAttribute: '_id',
        });
        const msgSchema = new normalizr_1.schema.Array(msg);
        socket.on('mensajes', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const author = {
                id: data.author.id,
                nombre: data.author.nombre,
                edad: data.author.edad,
                avatar: data.author.avatar,
                email: data.author.email,
            };
            let mensaje = {
                author,
                texto: data.message,
                fecha: new Date(),
            };
            let res = undefined;
            if (mensaje.texto) {
                let frase = mensaje.texto.split(' ');
                if (frase.includes('stock')) {
                    socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Tenemos stock' });
                    res = { author: { nombre: 'admin' }, texto: 'Tenemos stock' };
                }
                if (frase.includes('envio')) {
                    socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Gratis' });
                    res = { author: { nombre: 'admin' }, texto: 'Gratis' };
                }
                if (frase.includes('metodo de pago')) {
                    socket.emit('mensajes', { author: { nombre: 'admin' }, texto: 'Credito, debito,efectivo' });
                    res = { author: { nombre: 'admin' }, texto: 'Credito, debito,efectivo' };
                }
                yield mensajeRepository_1.mensajeRepository.createMensaje(mensaje);
                if (res) {
                    yield mensajeRepository_1.mensajeRepository.createMensaje(res);
                }
            }
            let mensajes = yield mensajeRepository_1.mensajeRepository.getAllMensajes();
            io.emit('mensajes', mensajes);
        }));
        socket.on('askMensajes', (data) => __awaiter(void 0, void 0, void 0, function* () {
            let mensajes = yield mensajeRepository_1.mensajeRepository.getAllMensajes();
            socket.emit('mensajes', mensajes);
        }));
    }));
});
exports.initIo = initIo;
