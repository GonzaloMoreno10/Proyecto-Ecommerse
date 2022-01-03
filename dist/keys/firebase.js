"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const venv_1 = require("../constantes/venv");
exports.firebaseConfig = {
    projectId: venv_1.FIREBASE_PROJECT_ID,
    privateKey: venv_1.FIREBASE_PRIVATE_KEY,
    clientEmail: venv_1.FIREBASE_CLIENT_EMAIL,
};
