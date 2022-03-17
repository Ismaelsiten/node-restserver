const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");


class Server  {
    constructor() {
        this.app = express();
        this.port= process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar a BD
        this.conectarDB();


        //Midlewares
        this.middlewares();


        this.routes();

    }

   async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors() );

        // Lectura y parseo del body
        this.app.use(express.json());



        // Directorio público
        this.app.use(express.static('public'));
    

        }

    routes(){
      this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto' , process.env.PORT);
        
        });
    }

}

module.exports=Server;