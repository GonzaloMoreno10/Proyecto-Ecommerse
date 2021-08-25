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
const express_1 = __importDefault(require("express"));
const check_1 = require("../middlewares/check");
const models_1 = require("../models");
const repositorios_1 = require("../repositorios");
const Router = express_1.default.Router();
let prodRepo = new repositorios_1.ProductoRepository();
Router.get("/listar/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(request.params.id);
        let data = yield prodRepo.getProductosById(id);
        if (data) {
            response.status(200).json({ producto: data });
        }
        else {
            response.status(400).json({ data: "No se encontro el producto" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.get("/listar", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield prodRepo.getProductos();
        if (data) {
            if (data.length > 0) {
                response.status(200).json({ producto: data });
            }
            else {
                response.status(400).json({ data: "No existen productos" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.post("/agregar", check_1.check, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { nombre, descripcion, codigo, foto, precio, stock } = request.body;
        let producto = new models_1.Producto(0, new Date(), nombre, descripcion, codigo, foto, precio, stock, undefined);
        let result = yield prodRepo.guardar(producto);
        if (result == 1) {
            response.status(200).json({ data: "Producto guardado" });
        }
        else {
            response.status(500).json({ data: "Algo fallo" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.put("/actualizar/:id", check_1.check, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(request.params.id);
        let { nombre, descripcion, codigo, foto, precio, stock } = request.body;
        let producto = new models_1.Producto(id, new Date(), nombre, descripcion, codigo, foto, precio, stock, undefined);
        if (producto) {
            let data = yield prodRepo.actualizar(id, producto);
            if (data) {
                response.status(200).json({ producto: "Producto Actualizado", data });
            }
            else {
                response.status(500).json({ data: "No se encontro el producto" });
            }
        }
        else {
            response.status(400).json({ data: "No se encontro el producto" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.delete("/borrar/:id", check_1.check, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(request.params.id);
        let producto = yield prodRepo.getProductosById(id);
        let data = yield prodRepo.borrar(id);
        if (data) {
            response.status(200).json({ data: "Producto Eliminado", producto });
        }
        else {
            response.status(500).json({ data: "No se encontro el producto" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = Router;
