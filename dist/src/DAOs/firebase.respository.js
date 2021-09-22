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
        this.db = con.collection('productos');
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.db.get();
            let docs = res.docs;
            const productos = docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            console.log(productos);
            return productos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.db.doc(id).get();
            return ({
                id: res.id,
                data: res.data()
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = this.db.doc();
                return yield productDocument.create(data);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.doc(id).update(newProductData);
            return this.findById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.doc(id).delete();
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.codigo)
                query.codigo = options.codigo;
            let res = yield this.db.get(query);
            let docs = res.docs;
            const productos = docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            console.log(productos);
            return productos;
        });
    }
    //No llegue
    findProductsOnCart() {
        throw new Error("Method not implemented.");
    }
    findProductsOnCartById(id) {
        throw new Error("Method not implemented.");
    }
    deleteProductsOnCart(id) {
        throw new Error("Method not implemented.");
    }
    addProductsToCart(idProducto) {
        throw new Error("Method not implemented.");
    }
}
exports.FirebaseRepository = FirebaseRepository;
