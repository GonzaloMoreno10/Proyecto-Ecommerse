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
exports.mySqlRepository = void 0;
const promise_1 = require("mysql2/promise");
class MySqlRepository {
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield promise_1.createPool({
                host: "localhost",
                user: "root",
                password: "root",
                database: "ecommerce",
            });
            return connection;
        });
    }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield this.createConnection();
            let data = yield conexion.query("select * from productos");
            return data[0];
        });
    }
    findProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield this.createConnection();
            let data = yield conexion.query(`select * from productos where id = ${id}`);
            conexion.end();
            return data[0];
        });
    }
    updateProducts(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conexion = yield this.createConnection();
                let data = yield conexion.query(`update productos set nombre = '${producto.nombre}' , descripcion = '${producto.descripcion}' , codigo = ${producto.codigo} , 
    foto = '${producto.foto}' , precio = ${producto.precio} , stock = ${producto.stock} where id =${id} `);
                let res = Object.assign(data);
                console.log(res.insertId);
            }
            catch (err) {
                return err;
            }
        });
    }
    createproducts(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`insert into productos (nombre,descripcion,codigo,foto,precio,stock) values( '${producto.nombre}','${producto.descripcion}',${producto.codigo}
    ,'${producto.foto}',${producto.precio},${producto.stock})`);
            return Object.assign(data[0]).insertId;
        });
    }
    deleteProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let prod = yield this.findProductsById(id);
            if (prod) {
                let data = yield conexion.query(`delete from productos where id = ${id}`);
                if (Object.assign(data[0]).affectedRows > 0) {
                    return prod;
                }
            }
        });
    }
    findAllCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`select * from carritos`);
            return data[0];
        });
    }
    findCartsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`select * from carritos where id = ${id}`);
            return data[0];
        });
    }
    updateCarts(id, carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`update carrito set timestamp = ${carrito.timestamp} where id = ${id}`);
            return data[0];
        });
    }
    createCarts(carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`insert into carritos (timestamp) values( ${carrito.timestamp})`);
            return data[0];
        });
    }
    deleteCarts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`delete from carritos where id = ${id}`);
            return data[0];
        });
    }
}
exports.mySqlRepository = new MySqlRepository();
