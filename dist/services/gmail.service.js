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
exports.GmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const venv_1 = require("../constants/venv");
class Gmail {
    //gmail
    constructor() {
        this.owner = {
            name: 'Gonzalo Moreno',
            address: venv_1.ADMIN_MAIL,
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: venv_1.NODEMAILER_HOST,
            port: venv_1.NODEMAILER_PORT,
            secure: true,
            auth: {
                user: venv_1.ADMIN_MAIL,
                pass: venv_1.GMAIL_SECRET,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    sendEmail(dest, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.owner,
                to: dest,
                subject,
                html: content,
            };
            const response = yield this.transporter.sendMail(mailOptions);
            return response;
        });
    }
}
exports.GmailService = new Gmail();
