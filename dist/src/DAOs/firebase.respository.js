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
exports.FirebaseRepository = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_1 = require("../../keys/firebase");
class FirebaseRepository {
    constructor() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(firebase_1.firebaseConfig),
        });
        let con = firebase_admin_1.default.firestore();
        this.productos = con.collection("productos");
        this.carritos = con.collection("carritos");
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.productos.get();
            let docs = res.docs;
            const productos = docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            //console.log(productos);
            return productos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.productos.doc(id).get();
            return {
                id: res.id,
                data: res.data(),
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = this.productos.doc();
                return yield productDocument.create(data);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.doc(id).update(newProductData);
            return this.findById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productos.doc(id).delete();
        });
    }
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.carritos.get();
            let docs = res.docs;
            const carrito = docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            return carrito[0].data.productos;
        });
    }
    findProductsOnCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.carritos.get();
            let docs = res.docs;
            const carrito = docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            let cart = carrito[0].data.productos;
            for (let i in cart) {
                if (cart[i].id === id) {
                    return cart[i];
                }
            }
        });
    }
    deleteProductsOnCart(id) {
        throw new Error("Method not implemented.");
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    query(options) {
        throw new Error("Method not implemented.");
    }
}
exports.FirebaseRepository = FirebaseRepository;
