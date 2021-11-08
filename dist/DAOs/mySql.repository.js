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
const venv_1 = require("../constantes/venv");
class MySqlProductoRepository {
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, promise_1.createPool)({
                host: 'localhost',
                user: venv_1.MYSQL_USER,
                password: venv_1.MYSQL_PASSWORD,
                database: venv_1.MYSQL_DBNAME,
            });
            return connection;
        });
    }
    //Productos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield this.createConnection();
            let data = yield conexion.query('select * from productos where enabled = 1');
            return data[0];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = parseInt(id);
            const conexion = yield this.createConnection();
            let data = yield conexion.query(`select * from productos where id = ${Id} and enabled = 1`);
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
    foto = '${producto.foto}' , precio = ${producto.precio} , stock = ${producto.stock} where id =${Id}`);
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
            let data = yield conexion.query(`insert into productos (nombre,descripcion,codigo,foto,precio,stock,enabled) values( '${producto.nombre}','${producto.descripcion}',${producto.codigo}
    ,'${producto.foto}',${producto.precio},${producto.stock},1)`);
            return Object.assign(data[0]).insertId;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let Id = parseInt(id);
            let conexion = yield this.createConnection();
            let prod = yield this.findById(id);
            if (prod) {
                let data = yield conexion.query(`update productos set enabled = 0 where id = ${id}`);
            }
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let query = ' select * from productos where 1 = 1 ';
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
            console.log(data[0]);
            return data[0];
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            let conexion = yield this.createConnection();
            let existsInCart = yield this.findProductsOnCartById(idProducto);
            let existProduct = yield this.findById(idProducto);
            if (existProduct[0]) {
                if (!existsInCart[0]) {
                    yield conexion.query(`insert into carrito_productos (id_carrito,id_producto) values(1,${idProducto})`);
                    return yield this.findById(idProducto);
                }
                else {
                    return -1;
                }
            }
            else {
                return -2;
            }
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
