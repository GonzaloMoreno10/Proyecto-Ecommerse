export interface IMensaje {
  author: IAutor;
  texto: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
  createdUser: number;
  updatedUser: number;
}

export interface IAutor {
  id?: Object;
  nombre: string;
  edad: number;
  avatar: string;
  email: String;
  createdAt: Date;
  updatedAt?: Date;
  createdUser: number;
  updatedUser?: number;
}
