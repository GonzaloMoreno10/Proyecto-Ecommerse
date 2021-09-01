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
exports.carritoRepositorio = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const producto_repository_1 = require("./producto.repository");
let carritos_ds = path_1.default.join(__dirname, '../datasource/carritos.datasource.txt');
class CarritoRepository {
    //Metodo para leer la info del archivo productos.txt
    getProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            try {
                let data = yield promises_1.default.readFile(carritos_ds, "utf-8");
                array = data.split("\n");
                let array2 = array.filter(data => data != "");
                if (array2.length > 0) {
                    for (let i in array2) {
                        let carrito = (JSON.parse(array2[i]));
                        return carrito;
                    }
                }
                else {
                    return -1;
                }
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
        });
    }
    ;
    getProductosById(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.getProductos();
                console.log(productos);
                if (productos !== -1) {
                    for (let i in productos.carrito) {
                        if (productos.carrito[i].idCarrito == idProducto) {
                            return productos.carrito[i];
                        }
                    }
                }
                return -1;
            }
            catch (err) {
                console.log("Ocurrio un error " + err);
            }
        });
    }
    generarIdCarrito() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield promises_1.default.readFile(carritos_ds, "utf-8");
            let prods = JSON.parse(data);
            return prods.carrito.length;
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
    borrar(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.getProductosById(idProducto);
                let carrito = yield this.getProductos();
                let prodCarr = carrito.carrito;
                if (productos !== -1) {
                    for (let i in prodCarr) {
                        if (prodCarr[i].idCarrito == idProducto) {
                            prodCarr.splice(i, 1);
                            carrito.carrito = prodCarr;
                            yield promises_1.default.unlink(carritos_ds);
                            yield promises_1.default.writeFile(carritos_ds, "");
                            break;
                        }
                    }
                    let data = yield this.generarCarrito(carrito);
                    if (data == 1) {
                        return productos;
                    }
                }
                else {
                    return -1;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    guardarProducto(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let actualizada = false;
            try {
                let productos = yield producto_repository_1.productoRepository.getProductosById(producto.id);
                if (productos) {
                    let carrito = yield this.getProductos();
                    if (carrito !== -1) {
                        let carrProds = carrito.carrito;
                        console.log(carrProds);
                        producto.idCarrito = yield this.generarIdCarrito();
                        carrProds.push(producto);
                        carrito.carrito = carrProds;
                        actualizada = true;
                        if (actualizada) {
                            yield promises_1.default.unlink(carritos_ds);
                            yield promises_1.default.writeFile(carritos_ds, "");
                            yield promises_1.default.appendFile(carritos_ds, "\n" + JSON.stringify(carrito));
                            return carrito;
                        }
                    }
                    else {
                        return -1;
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
exports.carritoRepositorio = new CarritoRepository();
