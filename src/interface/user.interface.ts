export interface UserInterface extends Document {
  _id: String;
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
  admin: number;
}

export interface NewUserInterface {
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
}
