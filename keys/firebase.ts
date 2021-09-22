import { ServiceAccount } from "firebase-admin";
import { Venv } from "../src/constantes/venv";

export const firebaseConfig:ServiceAccount = {
    projectId: Venv.FIREBASE_PROJECT_ID,
    privateKey: Venv.FIREBASE_PRIVATE_KEY,
    clientEmail: Venv.FIREBASE_CLIENT_EMAIL
  }
  