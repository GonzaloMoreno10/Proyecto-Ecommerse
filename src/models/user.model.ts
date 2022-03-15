import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
  email: string;
  password: string;
  matchPassword: Function;
  admin: Number;
}

export interface IUserMySql {
  id?: string;
  nombre: string;
  direccion: string;
  fecha_nacimiento: number;
  telefono: string;
  avatar: string;
  email: string;
  password: string;
  rol_id: Number;
}

const usersSchema = new Schema({
  email: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String,
  admin: Number,
});

usersSchema.pre<IUser>('save', async function (next) {
  const user = this;
  //if(!user.IsModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

usersSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

usersSchema.methods.matchPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};
export default model<IUser>('users', usersSchema);
