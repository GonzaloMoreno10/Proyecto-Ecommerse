export namespace Venv{
    export const PORT = process.env.PORT || 8080;
    export const MYSQL_USER = process.env.MYSQL_USER || 'root'
    export const MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD || 'root';
    export const MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'ecommerce';
    export const MONGO_USER = process.env.MONGO_USER || 'root';
    export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'root';
    export const MONGO_DB = process.env.MONGO_DB || 'ecommerce';
    export const MONGO_ATLAS_USER = process.env.MONGO_ATLAS_USER || 'admin';
    export const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD || 'admin';
    export const MONGO_ATLAS_DB = process.env.MONGO_ATLAS_DB || 'ecommerce';
    export const MONGO_ATLAS_CLUSTER = process.env.MONGO_ATLAS_CLUSTER || 'cluster0.6d6g8.mongodb.net';
}