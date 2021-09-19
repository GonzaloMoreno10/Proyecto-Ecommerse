export namespace Venv{
    export const PORT = process.env.PORT || 8080;
    export const MYSQL_USER = process.env.MYSQL_USER || 'root'
    export const MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD || 'root';
    export const MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'ecommerce';
}