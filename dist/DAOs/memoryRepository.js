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
exports.ProdMemoriaRepository = void 0;
class ProdMemoriaRepository {
    constructor() {
        this.productos = [];
        const mockData = [
            { id: '1', nombre: 'lapiz', codigo: 1, foto: '', descripcion: '', precio: 100, stock: 10 },
            { id: '2', nombre: 'cartuchera', codigo: 1, foto: '', descripcion: '', precio: 100, stock: 10 },
            { id: '3', nombre: 'boligoma', codigo: 1, foto: '', descripcion: '', precio: 100, stock: 10 },
        ];
        mockData.forEach((aMock) => this.productos.push(aMock));
    }
    findIndex(id) {
        return this.productos.findIndex((aProduct) => aProduct.id == id);
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
                descripcion: data.descripcion
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
}
exports.ProdMemoriaRepository = ProdMemoriaRepository;
