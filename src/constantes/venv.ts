export namespace Venv{
    export const PORT = process.env.PORT;
    export const MYSQL_USER = process.env.MYSQL_USER||'root'
    export const MYSQL_PASSWORD =  process.env.MYSQL_PASSWORD||'root';
    export const MYSQL_DBNAME = process.env.MYSQL_DBNAME||'ecommerce';
    export const MONGO_USER = process.env.MONGO_USER ||'root';
    export const MONGO_PASSWORD = process.env.MONGO_PASSWORD ||'root';
    export const MONGO_DB = process.env.MONGO_DB||'ecommerce';
    export const MONGO_ATLAS_USER = process.env.MONGO_ATLAS_USER||'admin' ;
    export const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD||'admin';
    export const MONGO_ATLAS_DB = process.env.MONGO_ATLAS_DB||"ecommerce";
    export const MONGO_ATLAS_CLUSTER = process.env.MONGO_ATLAS_CLUSTER||'cluster0.6d6g8.mongodb.net';
    export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ||'ecommerce-d572c';
    export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY||"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/3TCWe7iyB/Ay\nCrYhXXlC/TKGNj4og3AiXOf4JRjk9RWZJgXkluLetf99bHImULQRWP0p4mOn9Koo\n+f8vPB0QBPe6JX3yDdy/rkLHVBTK1HMlnTzY3PTIwWSWE123+PkUnyvrBEU0DMhE\nUljpvkWpOOLeHgHs3ye1Em+TdJy9vc9V1Kh0fNFvwjFyo26z6Km/Dg3T+5lFte3h\nSr7kBXdbotjo5DNcg+mhenB6I3k/3l8ov+DAZS+ZOVdAEFhmrP+m8hxam6NQlc48\nLSPCwLVYb2YVMmQ4cle8CbW3B950aUUtS0+aYNewyc7EwOc2EIcmaJ7iRjs6QJYB\n4+VI5BppAgMBAAECggEAAR0rJYyFV39FTT0TrqDozdNDglT5Smns8j4g2Kd6fAXS\nQMfgO+IGYi2jVJqXFRLd4MXn/mDCnFyGymMdMKyELK4itBF4qDmdYP2FhLu/vSe7\nnWnKyyWJREsfJuHo5uMKqyx7aEtnjXRPi1oBCyZgKCnc41ZAQ5xOEjaPsEb6i/12\nCsN2zSyKPVzfn9z+Ad3bp7UefQvSAfntyZjtFO15DW0qj1T0MZdul7F7QBwaNB9X\nm7p1QosjIFD+Tv8f8NyDKGHwf0TjlzpvW8b87btHyFurRPvwuWlQomiwcLTwDO2U\nryyAhxClnrdEAT5u4RbiskUfPVsgGbLHhqAF8orpwQKBgQD2JfPcsDm/jBoNPDcf\n/QYm+7JxdjCbHubMoSg3G5k4Ms1njKWDrPxOtlMLkbMvJ1q8A1xk1q+C8urQlvLg\nXERsD0SIY3hYVAe0JO04PtCTZ0no/k6fH5Qe8hT0AK+Gs30/vZO3dzmBSYWtUmMk\nZmX8uXyrfJhDw/M3e/LGP6q6mQKBgQDHiwnLAD9tdJGce/qxCbrNEDV3QFGELOgu\nsFk+NbdG9uZFoTKPBjx21uuNjQl6DLWbBmUshYglcsHTs+y7qpDufbW7hSzOcJh4\n0AlI4v+Y7ykaa9uOXSF4jdv27vE7P/4cegUqwymRXZZmZvhsAUZwFOg+bdgLw8FG\ns/7dZNGQUQKBgQDnH/HgWfSPgF0B6nWUasA5IIOIeELhlN2AbR5WyGpRU5p9TZoo\njuiGfDp0FYYbk6dl/P3njZJVsgR8ghBiTSDOGnPuYQAiaBynsTixZIHytry2svtd\n/IfXmtXD21T1dVn43Oh0D9YGKOQFP+PpzOCcsgp291H952NbyN3H+wYzmQKBgQCv\nxdhwi91Ti7WgxM2GGe4FKVwPmga0ieJVDl7un968kk0x1Nd2iaXFgXipji1k58Ep\nuC5zU4Ukh7wZwoqsnYlhrDbj4mIfz6tf8NHc9Kj2jOYGMjCLbZpIWZ4EHWM+MBal\n+w6GJrh9JpWPyvDWIyFrJd+W7qe7ZUrh/zhoyaCYoQKBgAmxBbmKE5huq5yjLg3i\nlLeM8AA43fo8WrEP2kOYD8CsM0MlsHoNeWjJsgbAbP7QTkphKiYsMi7iOfR527Cg\nDtHQuQjhBQJswFlEfJc1crNH2MwQZLsLDHYO7NZTGMgYyhWvpYkP7Ysn1oJXJh77\nuibsHEjU2zcRmsb5VoD4pq1m\n-----END PRIVATE KEY-----\n";
    export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL||"firebase-adminsdk-pmm2k@ecommerce-d572c.iam.gserviceaccount.com"
}