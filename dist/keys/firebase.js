"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebaseConfig = void 0;

var venv_1 = require("../src/constantes/venv");

exports.firebaseConfig = {
  projectId: venv_1.Venv.FIREBASE_PROJECT_ID,
  privateKey: venv_1.Venv.FIREBASE_PRIVATE_KEY,
  clientEmail: venv_1.Venv.FIREBASE_CLIENT_EMAIL
};