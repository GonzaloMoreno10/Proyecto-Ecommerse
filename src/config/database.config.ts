import { MYSQL_DBNAME, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from '../constants/venv';

export const dbConfig = {
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DBNAME,
  host: MYSQL_HOST,
  Dialect: 'mysql',
};
