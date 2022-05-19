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
exports.constructResponse = void 0;
const response_repository_1 = require("../repositories/response.repository");
const constructResponse = (resId, res, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield response_repository_1.responseRepository.getResponseByResIds(resId);
    let toReturn;
    if (response.some(x => x.resCod >= 400)) {
        const errors = response.map(res => {
            const error = {
                code: res.resId,
                message: res.resDesc,
            };
            return error;
        });
        toReturn = {
            code: 400,
            errors: errors,
        };
    }
    else {
        toReturn = {
            code: response[0].resCod,
            message: response[0].resDesc,
            data: data !== null && data !== void 0 ? data : [],
        };
    }
    res.status(toReturn.code).json(toReturn);
});
exports.constructResponse = constructResponse;
