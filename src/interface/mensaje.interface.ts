export interface IMensaje {
  author: IAutor;
  texto: string;
  fecha: Date;
}

export interface IAutor {
  id: Object;
  nombre: string;
  edad: number;
  avatar: string;
  email: String;
}
