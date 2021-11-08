/*import { tipoPersistencias } from '../constantes/persistencias';
import {
  FileSystemRepository,
  MySqlProductoRepository,
  FirebaseRepository,
  MemoriaRepository,
  SqliteRepository,
} from '../DAOs';

//import { SqliteRepository } from '../DAOs/sqlite.repository';

export class ProductFactoryDAO {
  static get(tipo: number) {
    switch (tipo) {
      case tipoPersistencias.FS:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        return new FileSystemRepository();
      case tipoPersistencias.MYSQL_LOCAL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL');
        return new MySqlProductoRepository();
      case tipoPersistencias.SQLITE:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new SqliteRepository();
      case tipoPersistencias.FIREBASE:
        console.log('RETORNANDO FIREBASE INSTANCE');
        return new FirebaseRepository();
      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new MemoriaRepository();
    }
  }
}*/
