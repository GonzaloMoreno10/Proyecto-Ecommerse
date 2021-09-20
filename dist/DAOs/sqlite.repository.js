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
}
exports.SqliteRepository = SqliteRepository;
