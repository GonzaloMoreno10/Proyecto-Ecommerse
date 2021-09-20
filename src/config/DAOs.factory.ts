import { tipoPersistencias } from '../constantes/persistencias';
import { FileSystemRepository, MySqlProductoRepository } from '../DAOs';
import { FirebaseRepository } from '../DAOs/firebase.respository';
import { ProdMemoriaRepository } from '../DAOs/memory.repository';
import { MongoProductsRepository } from '../DAOs/mongo.repository';
import { SqliteRepository } from '../DAOs/sqlite.repository';
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
      case tipoPersistencias.MONGO_LOCAL:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new MongoProductsRepository(true);
      case tipoPersistencias.MONGO_ATLAS:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new MongoProductsRepository(false);
      case tipoPersistencias.SQLITE:
        console.log('RETORNANDO INSTANCIA CLASE SQLITE');
        return new SqliteRepository();
      case tipoPersistencias.FIREBASE:
        console.log('RETORNANDO FIREBASE INSTANCE')
        return new FirebaseRepository()
      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProdMemoriaRepository();
    }
  }
}
