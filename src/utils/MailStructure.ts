// import { NewUserInterface, ProductInterface, UserInterface } from '../interface';

// export const cadena = (user: NewUserInterface) => {
//   return `<h4>Se registro un nuevo usuarios</h4>
//     <h4>Los datos son: </h4>
//     <p>Nombre: ${user.nombre}</p>
//     <p>Edad: ${user.edad}</p>
//     <p>Telefono: ${user.telefono}</p>
//     <p>Email: ${user.email}</p>
//     <p>Direccion: ${user.direccion}</p>`;
// };

// export const compra = (products: ProductInterface[], user: UserInterface, total: string) => {
//   let compra = '';
//   for (let i in products) {
//     compra += `<p>${products[i].nombre}</p> <p>${products[i].precio}</p> <img src="${products[i].foto}" width:200px height:200px/>`;
//   }
//   return `<h4>Recibimos el pedido a tu nombre</h4>
//     <h4>Cliente</h4>
//     <p>Nombre: ${user.nombre}</p>
//     <p>Email: ${user.email}</p>
//     <h4>Compra</h4>
//     ${compra}
//     <p>Se envia a: ${user.direccion}</p>`;
// };

// export const compraWhatSapp = (products: ProductInterface[], user: UserInterface, total: string) => {
//   let compra = '';
//   for (let i in products) {
//     compra += `${products[i].nombre}
//     `;
//   }
//   return `Se realizo un pedido a nombre de ${user.nombre}, email ${user.email}
//     Se compraron los siguientes articulos:
//     ${compra}
//     `; cambio para heroku
// };
