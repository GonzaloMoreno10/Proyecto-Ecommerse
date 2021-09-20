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
exports.FSRepositorio = exports.FileSystemRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const carrito_model_1 = require("../models/carrito.model");
let carritos_ds = path_1.default.join(__dirname, '../datasource/carritos.datasource.txt');
let productos_ds = path_1.default.join(__dirname, "../datasource/productos.datasource.txt");
class FileSystemRepository {
    //Productos
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            try {
                let data = yield promises_1.default.readFile(productos_ds, "utf-8");
                array = data.split("\n");
                let array2 = array.filter((data) => data != "");
                if (array2.length > 0) {
                    let productos = array2.map((data) => JSON.parse(data));
                    return productos;
                }
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
            return [];
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                data = yield this.findAll();
                if (data) {
                    for (let i in data) {
                        if (data[i].id == id) {
                            return data[i];
                        }
                    }
                }
            }
            catch (error) {
                console.log("Error: " + error);
            }
        });
    }
    ;
    //Metodo utilizado para guardar un objeto producto
    create(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield this.generarIdProduct();
            let productos = yield this.findAll();
            if (productos) {
                producto.id = id;
                if (producto.nombre) {
                    try {
                        yield promises_1.default.appendFile(productos_ds, "\n" + JSON.stringify(producto));
                        let productoTeReturn = yield this.findById(id);
                        return productoTeReturn;
                    }
                    catch (err) {
                        console.log("Ocurrio un error " + err);
                    }
                }
            }
            else {
                yield promises_1.default.writeFile(productos_ds, JSON.stringify(producto));
                let productoTeReturn = yield this.findById(id);
                return productoTeReturn;
            }
        });
    }
    //Metodo utilizado para generar el id
    generarIdProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            let data = yield promises_1.default.readFile(productos_ds, "utf-8");
            array = data.split("\n");
            return array.length;
        });
    }
    //Metodo utilizado para borrar el archivo
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            try {
                let productos = yield this.findAll();
                if (productos) {
                    for (i in productos) {
                        if (productos[i].id == id) {
                            productos.splice(i, 1);
                            yield promises_1.default.unlink(productos_ds);
                            yield promises_1.default.writeFile(productos_ds, "");
                        }
                    }
                }
                for (let i in productos) {
                    yield this.create(productos[i]);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    update(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let actualizada = 0;
            try {
                let productos = yield this.findAll();
                if (productos) {
                    for (let i in productos) {
                        if (productos[i].id == id) {
                            productos[i].nombre = producto.nombre;
                            productos[i].descripcion = producto.descripcion;
                            productos[i].codigo = producto.codigo;
                            productos[i].foto = producto.foto;
                            productos[i].precio = producto.precio;
                            productos[i].stock = producto.stock;
                            //productos[i].timestamp = new Date();
                            console.log(productos[i]);
                            actualizada = 1;
                            break;
                        }
                    }
                    if (actualizada == 1) {
                        yield promises_1.default.unlink(productos_ds);
                        yield promises_1.default.writeFile(productos_ds, "");
                        for (let i in productos) {
                            yield this.create(productos[i]);
                        }
                        return yield this.findById(id);
                    }
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Metodo para leer la info del archivo productos.txt
    findAllProductsInCart() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            try {
                let data = yield promises_1.default.readFile(carritos_ds, "utf-8");
                array = data.split("\n");
                let array2 = array.filter(data => data != "");
                if (array2.length > 0) {
                    for (let i in array2) {
                        let carrito = (JSON.parse(array2[i]));
                        return carrito.productos;
                    }
                }
                else {
                    return [];
                }
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
            return [];
        });
    }
    ;
    findCarrito() {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = new carrito_model_1.Carrito(0, new Date, []);
            try {
                let data = yield promises_1.default.readFile(carritos_ds, "utf-8");
                let array = data.split("\n");
                let array2 = array.filter(data => data != "");
                for (let i in array2) {
                    carrito = JSON.parse(array2[i]);
                }
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
            return carrito;
        });
    }
    ;
}
exports.FileSystemRepository = FileSystemRepository;
exports.FSRepositorio = new FileSystemRepository();
