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
exports.productoRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
let productos_ds = path_1.default.join(__dirname, "../datasource/productos.datasource.txt");
class ProductoRepository {
    constructor() {
        this.getProductosById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                data = yield this.getProductos();
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
    //Metodo para leer la info del archivo productos.txt
    getProductos() {
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
    //Metodo utilizado para guardar un objeto producto
    guardar(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield this.generarId();
            let productos = yield this.getProductos();
            if (productos) {
                producto.id = id;
                if (producto.nombre) {
                    try {
                        yield promises_1.default.appendFile(productos_ds, "\n" + JSON.stringify(producto));
                        return 1;
                    }
                    catch (err) {
                        console.log("Ocurrio un error " + err);
                    }
                }
            }
            else {
                yield promises_1.default.writeFile(productos_ds, JSON.stringify(producto));
                return 1;
            }
        });
    }
    //Metodo utilizado para generar el id
    generarId() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            let data = yield promises_1.default.readFile(productos_ds, "utf-8");
            array = data.split("\n");
            return array.length;
        });
    }
    //Metodo utilizado para borrar el archivo
    borrar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let prod;
            let i;
            try {
                let productos = yield this.getProductos();
                if (productos) {
                    for (i in productos) {
                        if (productos[i].id == id) {
                            productos.splice(i, 1);
                            yield promises_1.default.unlink(productos_ds);
                            yield promises_1.default.writeFile(productos_ds, "");
                            for (let i in productos) {
                                yield this.guardar(productos[i]);
                            }
                            return 1;
                        }
                    }
                }
            }
            catch (err) {
                throw err;
            }
            return -1;
        });
    }
    actualizar(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let actualizada = 0;
            try {
                let productos = yield this.getProductos();
                if (productos) {
                    for (let i in productos) {
                        if (productos[i].id == id) {
                            productos[i].nombre = producto.nombre;
                            productos[i].descripcion = producto.descripcion;
                            productos[i].codigo = producto.codigo;
                            productos[i].foto = producto.foto;
                            productos[i].precio = producto.precio;
                            productos[i].stock = producto.stock;
                            productos[i].timestamp = new Date();
                            console.log(productos[i]);
                            actualizada = 1;
                            break;
                        }
                    }
                    if (actualizada == 1) {
                        yield promises_1.default.unlink(productos_ds);
                        yield promises_1.default.writeFile(productos_ds, "");
                        for (let i in productos) {
                            yield this.guardar(productos[i]);
                        }
                        return yield this.getProductosById(id);
                    }
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.productoRepository = new ProductoRepository();
