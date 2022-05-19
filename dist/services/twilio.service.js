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
exports.SmsService = void 0;
const twilio_1 = __importDefault(require("twilio"));
const venv_1 = require("../constants/venv");
class Twilio {
    constructor() {
        this.twilio = (0, twilio_1.default)(venv_1.TWILIO_SID, venv_1.TWILIO_TOKEN);
    }
    sendMessage(cellphoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: venv_1.ADMIN_CELPHONE,
                to: cellphoneNumber,
            };
            const response = yield this.twilio.messages.create(params);
            return response;
        });
    }
    sendWhatSapp(cellphoneNumber, message, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: `whatsapp:${venv_1.TWILIO_ADMIN_WHATSAPP}`,
                to: `whatsapp:${cellphoneNumber}`,
            };
            //asdasdasd
            if (picture)
                params.mediaUrl = [picture];
            const response = yield this.twilio.messages.create(params);
            return response;
        });
    }
}
exports.SmsService = new Twilio();
