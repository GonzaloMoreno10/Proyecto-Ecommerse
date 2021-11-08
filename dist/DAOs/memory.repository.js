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
exports.MemoriaRepository = void 0;
class MemoriaRepository {
    constructor() {
        this.productos = [];
        const mockData = [
            {
                id: 1,
                nombre: 'lapiz',
                codigo: 1,
                foto: '',
                descripcion: '',
                precio: 100,
                stock: 10,
            },
            {
                id: 2,
                nombre: 'cartuchera',
                codigo: 1,
                foto: '',
                descripcion: '',
                precio: 100,
                stock: 10,
            },
            {
                id: 3,
                nombre: 'boligoma',
                codigo: 1,
                foto: '',
                descripcion: '',
                precio: 100,
                stock: 10,
            },
        ];
        mockData.forEach(aMock => this.productos.push(aMock));
        //mockData.forEach((aMock) => this.carrito.productos.push(aMock));
        this.carrito = { id: 1, timestamp: new Date(), productos: mockData };
    }
    findIndex(id) {
        return this.productos.findIndex(aProduct => aProduct.id == id);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i in this.productos) {
                if (this.productos[i].id === id) {
                    return this.productos[i];
                }
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nombre || !data.precio)
                throw new Error('invalid data');
            const newItem = {
                id: (this.productos.length + 1).toString(),
                nombre: data.nombre,
                precio: data.precio,
                stock: data.stock,
                codigo: data.codigo,
                foto: data.foto,
                descripcion: data.descripcion,
            };
            this.productos.push(newItem);
            return newItem;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            const oldProduct = this.productos[index];
            const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
            this.productos.splice(index, 1, updatedProduct);
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            this.productos.splice(index, 1);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            if (options.codigo)
                query.push((aProduct) => aProduct.codigo == options.codigo);
            if (options.minStock && options.maxStock) {
                query.push((aProduct) => aProduct.stock > options.minStock && aProduct.stock < options.maxStock);
            }
            if (options.minPrice && options.maxPrice)
                query.push((aProduct) => aProduct.precio > options.minPrice && aProduct.precio < options.maxPrice);
            return this.productos.filter(aProduct => query.every(x => x(aProduct)));
        });
    }
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.carrito.productos;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    findProductsOnCartById(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i in this.carrito.productos) {
                    if (this.carrito.productos[i].id == idProducto) {
                        return this.carrito.productos[i];
                    }
                }
            }
            catch (err) {
                console.log('Ocurrio un error ' + err);
            }
        });
    }
    deleteProductsOnCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let producto = yield this.findProductsOnCartById(idProducto);
                if (producto) {
                    //console.log(producto);
                    for (let i = 0; i < this.carrito.productos.length; i++) {
                        if (this.carrito.productos[i].id == idProducto) {
                            // console.log(this.carrito.productos[i])
                            let prods = this.carrito.productos.splice(i, 1);
                        }
                    }
                    return producto;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let producto = yield this.findById(idProducto);
                console.log(producto);
                if (producto) {
                    console.log(producto);
                    this.carrito.productos.push(producto);
                    return producto;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.MemoriaRepository = MemoriaRepository;
