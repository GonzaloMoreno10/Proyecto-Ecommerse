import { createPool, Pool } from 'mysql2/promise';
import { MYSQL_USER, MYSQL_DBNAME, MYSQL_PASSWORD, MYSQL_HOST } from '../constants/venv';
export class MySqlDataSource {
  connection() {
    let conn: Pool;
    conn = createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DBNAME,
    });

    return conn;
  }
}

export const mysqlDataSource = new MySqlDataSource();
