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
exports.MySqlProductoRepository = void 0;
const promise_1 = require("mysql2/promise");
class MySqlProductoRepository {
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
    //Productos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield this.createConnection();
            let data = yield conexion.query("select * from productos");
            return data[0];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = parseInt(id);
            const conexion = yield this.createConnection();
            let data = yield conexion.query(`select * from productos where id = ${Id}`);
            conexion.end();
            return data[0];
        });
    }
    update(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Id = parseInt(id);
                let conexion = yield this.createConnection();
                let data = yield conexion.query(`update productos set nombre = '${producto.nombre}' , descripcion = '${producto.descripcion}' , codigo = ${producto.codigo} , 
    foto = '${producto.foto}' , precio = ${producto.precio} , stock = ${producto.stock} where id =${Id} `);
                let res = Object.assign(data);
                console.log(res.insertId);
            }
            catch (err) {
                return err;
            }
        });
    }
    create(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`insert into productos (nombre,descripcion,codigo,foto,precio,stock) values( '${producto.nombre}','${producto.descripcion}',${producto.codigo}
    ,'${producto.foto}',${producto.precio},${producto.stock})`);
            return Object.assign(data[0]).insertId;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = parseInt(id);
            let conexion = yield this.createConnection();
            let prod = yield this.findById(id);
            if (prod) {
                let data = yield conexion.query(`delete from productos where id = ${Id}`);
            }
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let query = ' select * from productos where id > 0 ';
            if (options.nombre)
                query += ` and  nombre = '${options.nombre}' `;
            if (options.codigo)
                query += ` and  codigo = ${options.codigo} `;
            if (options.minPrice)
                query += ` and  precio > ${options.minPrice} `;
            if (options.maxPrice)
                query += ` and  precio < ${options.maxPrice}`;
            if (options.minStock)
                query += ` and  stock > ${options.minStock}`;
            if (options.maxStock)
                query += ` and  stock < ${options.maxStock}`;
            console.log(query);
            let data = yield conexion.query(query);
            return data[0];
        });
    }
    //Carritos
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`select p.* from carrito_productos cp,productos p where p.id = cp.id_producto`);
            return data[0];
        });
    }
    findProductsOnCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let data = yield conexion.query(`select p.* from carrito_productos cp,productos p where p.id = cp.id_producto and p.id = ${id}`);
            return data[0];
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            yield conexion.query(`insert into carrito_productos (id_carrito,id_producto) values(1,${idProducto})`);
            return yield this.findById(idProducto);
        });
    }
    deleteProductsOnCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let prod = yield this.findById(idProducto);
            if (prod) {
                yield conexion.query(`delete from carrito_productos where id_carrito = 1 and id_producto = ${idProducto}`);
            }
            return prod;
        });
    }
}
exports.MySqlProductoRepository = MySqlProductoRepository;
