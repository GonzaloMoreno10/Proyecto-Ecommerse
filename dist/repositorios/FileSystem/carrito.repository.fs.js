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
exports.FScarritoRepositorio = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const carrito_model_1 = require("../../models/carrito.model");
let carritos_ds = path_1.default.join(__dirname, '../../datasource/carritos.datasource.txt');
class FileSystemCarritoRepository {
    //Metodo para leer la info del archivo productos.txt
    findAll() {
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
    findById(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.findAll();
                if (productos) {
                    for (let i in productos) {
                        if (productos[i].idCarrito == idProducto) {
                            return productos[i];
                        }
                    }
                }
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
        });
    }
    generarIdCarrito() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield promises_1.default.readFile(carritos_ds, "utf-8");
            let carrito = JSON.parse(data);
            return carrito.productos.length;
        });
    }
    ;
    generarId(array) {
        return __awaiter(this, void 0, void 0, function* () {
            return array.length;
        });
    }
    generarCarrito(carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.appendFile(carritos_ds, "\n" + JSON.stringify(carrito));
                return 1;
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
        });
    }
    //Metodo utilizado para borrar el archivo
    delete(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let carrito = yield this.findCarrito();
                let producto = yield this.findById(idProducto);
                let productos = yield this.findAll();
                if (productos) {
                    for (let i in productos) {
                        if (productos[i].idCarrito == idProducto) {
                            productos.splice(parseInt(i), 1);
                            carrito.productos = productos;
                            //carrito.carrito = prodCarr;
                            yield promises_1.default.unlink(carritos_ds);
                            yield promises_1.default.writeFile(carritos_ds, "");
                            break;
                        }
                    }
                    let data = yield this.generarCarrito(carrito);
                    if (data == 1) {
                        return producto;
                    }
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    create(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let actualizada = false;
            try {
                let carrito = yield this.findCarrito();
                if (carrito) {
                    let carrProds = carrito.productos;
                    producto.idCarrito = yield this.generarIdCarrito();
                    carrProds.push(producto);
                    carrito.productos = carrProds;
                    actualizada = true;
                    if (actualizada) {
                        yield promises_1.default.unlink(carritos_ds);
                        yield promises_1.default.writeFile(carritos_ds, "");
                        yield promises_1.default.appendFile(carritos_ds, "\n" + JSON.stringify(carrito));
                        return producto;
                    }
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
}
exports.FScarritoRepositorio = new FileSystemCarritoRepository();
