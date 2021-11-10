import mongoose from 'mongoose';
import { MONGO_ATLAS_PASSWORD, MONGO_ATLAS_USER } from '../constantes/venv';

export default function connect(arg: string) {
  arg = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASSWORD}@cluster0.6d6g8.mongodb.net/ecommerce?retryWrites=true&w=majority`;
  console.log(arg);
  mongoose.connect(arg);
}
