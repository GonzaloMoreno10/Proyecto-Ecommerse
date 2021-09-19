import { tipoPersistencias } from '../constantes/persistencias';
import { FileSystemRepository, MySqlProductoRepository } from '../DAOs';


export class ProductFactoryDAO {
  static get(tipo: number) {
    switch (tipo) {
      case tipoPersistencias.FS:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        return new FileSystemRepository();
       case tipoPersistencias.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE MYSQL');
        return new MySqlProductoRepository();
      /*case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);*/

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        //return new ProductosMemDAO();
    }
  }
}
