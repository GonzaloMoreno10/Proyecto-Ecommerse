"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compraWhatSapp = exports.compra = exports.cadena = void 0;
const cadena = (user) => {
    return `<h4>Se registro un nuevo usuarios</h4>
    <h4>Los datos son: </h4>
    <p>Nombre: ${user.nombre}</p>
    <p>Edad: ${user.edad}</p>
    <p>Telefono: ${user.telefono}</p>
    <p>Email: ${user.email}</p>
    <p>Direccion: ${user.direccion}</p>`;
};
exports.cadena = cadena;
const compra = (products, user, total) => {
    let compra = '';
    for (let i in products) {
        compra += `<p>${products[i].nombre}</p> <p>${products[i].precio}</p> <img src="${products[i].foto}" width:200px height:200px/>`;
    }
    return `<h4>Recibimos el pedido a tu nombre</h4>
    <h4>Cliente</h4>
    <p>Nombre: ${user.nombre}</p>
    <p>Email: ${user.email}</p>
    <h4>Compra</h4>
    ${compra}
    <p>Se envia a: ${user.direccion}</p>`;
};
exports.compra = compra;
const compraWhatSapp = (products, user, total) => {
    let compra = '';
    for (let i in products) {
        compra += `${products[i].nombre}
    `;
    }
    return `Se realizo un pedido a nombre de ${user.nombre}, email ${user.email}
    Se compraron los siguientes articulos: 
    ${compra}
    `;
};
exports.compraWhatSapp = compraWhatSapp;
