//este archivo estará encargado de arrancar el proyecto solamente, mientras que las configuraciones estarán en el archivo app.ts.
import app from "./app";
import { initialdb } from "./db";
import { PORT } from "./config";


async function main() {
    //asignamos el puerto donde se escuchrá.

    try {
        await initialdb();
        app.listen(PORT);
        console.log('listen on port', PORT);


    }catch(err) {
        console.log('Something has gone wrong: ', err);
    }
    
}

main();

