export interface UserInterface {
  _id: String;
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
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
