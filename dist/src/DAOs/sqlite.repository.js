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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteRepository = void 0;
const knex_1 = __importDefault(require("knex"));
class SqliteRepository {
    constructor() {
        this.sqliteDB = knex_1.default({
            client: "sqlite3",
            connection: { filename: "./ecommerce" },
            useNullAsDefault: false,
        });
    }
    getUsers() {
        throw new Error("Method not implemented.");
    }
    getUsersById(id) {
        throw new Error("Method not implemented.");
    }
    getUsersByUserName(userName) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB.from('productos').select();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB.from('productos').where('id', '=', id).select();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB('productos').insert(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB('productos').where('id', '=', id).update(data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB('productos').where('id', '=', id).del();
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `this.sqliteDB('productos').where('id','>','0')`;
            if (options.nombre)
                query += `.andWhere('nombre','=','${options.nombre}')`;
            if (options.codigo)
                query += `.andWhere('codigo',${options.codigo})`;
            if (options.minPrice)
                query += `.andWhere('precio','>',${options.minPrice})`;
            if (options.maxPrice)
                query += `.andWhere('precio','<',${options.maxPrice})`;
            if (options.minStock)
                query += `.andWhere('stock','>',${options.minStock})`;
            if (options.minStock)
                query += `.andWhere('stock','<',${options.maxStock})`;
            console.log(query);
            return yield eval(query);
        });
    }
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqliteDB({ a: 'carritos_productos', b: 'productos' }).select({ id: 'b.id', nombre: 'b.nombre', descripcion: 'b.descripcion',
                precio: 'b.precio', stock: 'b.stock', foto: 'b.foto', codigo: 'b.codigo' }).whereRaw('?? = ??', ['a.id_producto', 'b.id']);
        });
    }
    findProductsOnCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            return this.sqliteDB({ a: 'carritos_productos', b: 'productos' }).select({ id: 'b.id', nombre: 'b.nombre', descripcion: 'b.descripcion',
                precio: 'b.precio', stock: 'b.stock', foto: 'b.foto', codigo: 'b.codigo' }).whereRaw('?? = ??', ['a.id_producto', 'b.id']).andWhere('b.id', '=', id);
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sqliteDB('carritos_productos').insert({ id_carrito: 1, id_producto: idProducto });
            return yield this.findById(idProducto);
        });
    }
    deleteProductsOnCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sqliteDB('carritos_productos').where('id_producto', '=', idProducto).andWhere('id_carrito', '=', 1).del();
            return this.findById(idProducto);
        });
    }
}
exports.SqliteRepository = SqliteRepository;
