import { Schema, model } from 'mongoose';
import { UserInterface } from '../interface';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  matchPassword: Function;
}

const usersSchema = new Schema({
  email: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String,
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
  console.log(compare);
  return compare;
};
export default model<IUser>('users', usersSchema);
