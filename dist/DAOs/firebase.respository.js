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
let serviceAccount = require("../config/firebase.json");
class FirebaseRepository {
    constructor(local = false) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
        });
        let con = firebase_admin_1.default.firestore();
        this.db = con.collection('productos');
    }
    //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    /*async findAll(): Promise<ProductInterface[]> {
       
    }
  
    async findById(id: string): Promise<ProductInterface | undefined> {
      try {
       
      } catch (err) {
        
      }
    }*/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = this.db.doc();
                return yield doc.create(data);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /*async update(
      id: string,
      newProductData: newProductInterface
    ): Promise<ProductInterface> {
      
    }*/
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.FirebaseRepository = FirebaseRepository;
