import { createPool, Pool } from 'mysql2/promise';
import { MYSQL_USER, MYSQL_DBNAME, MYSQL_PASSWORD, MYSQL_HOST } from '../constantes/venv';
import minimist from 'minimist';
export class MySqlDataSource {
  connection() {
    let conn: Pool;
    const argumentos = minimist(process.argv.slice(2));
    if (argumentos.local) {
      conn = createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'integraciones',
      });
    } else {
      conn = createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DBNAME,
      });
    }

    return conn;
  }
}

export const mysqlDataSource = new MySqlDataSource();
