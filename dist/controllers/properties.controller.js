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
exports.propertyController = void 0;
const properties_repository_1 = require("../repositories/properties.repository");
class PropertyController {
    setPropertyValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value, id } = req.body;
                if (!value || !id) {
                    return res.status(400).json({ message: 'invalid body' });
                }
                const result = yield properties_repository_1.propertiesRepository.setPropertyValue({ value, id });
                return res.status(200).json({ message: 'ok', id: Object.assign(result).insertId });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
        });
    }
    setProperties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId, productTypeId, propertyName, subProperties } = req.body;
            try {
                const result = yield properties_repository_1.propertiesRepository.setProperty({ categoryId, productTypeId, propertyName, subProperties });
                const property = yield properties_repository_1.propertiesRepository.getPropertyByid(result);
                const subProp = yield properties_repository_1.propertiesRepository.getSubProperties(property[0].id);
                const toReturn = {
                    property,
                    subProperties: subProp,
                };
                return res.status(200).json(toReturn);
            }
            catch (err) {
                return res.status(400).json(err);
            }
        });
    }
    getPropertiesByProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productTypeId } = req.params;
                const properties = yield properties_repository_1.propertiesRepository.getPropertiesByProductType(parseInt(productTypeId));
                res.status(200).json(properties);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.propertyController = new PropertyController();
