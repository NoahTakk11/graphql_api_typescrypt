//este aechiv es el que conecta con la base de datos.
//utilizamos un orm de typescript


import { DataSource } from "typeorm";
import { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } from "./config";
import { Users } from "./schema/entites/user";

;

//configuramos los parámetros de la conexión.
const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        Users
    ],
    synchronize: true,
    ssl: false
})

//inicializamos la conección.
export const initialdb =async () => {
    
    await AppDataSource.initialize()
    .then(() => {
        console.log('Data source has been initialized!')
    })
    .catch((err) => {
        console.log('Error during Data source initialization', err)
    })
}
