import mongoose from 'mongoose';
import { MONGO_ATLAS_CLUSTER, MONGO_ATLAS_PASSWORD, MONGO_ATLAS_DB, MONGO_ATLAS_USER } from '../constantes/venv';

export default function connect(arg: string) {
  arg = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASSWORD}@${MONGO_ATLAS_CLUSTER}/${MONGO_ATLAS_DB}?retryWrites=true&w=majority`;

  mongoose.connect(arg);
}
