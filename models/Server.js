import express from 'express';
import cors from 'cors';
import dbConnection from '../DataBase/config.js';
import categoria from '../routes/categoria.js'
import usuario from '../routes/usuario.js'

class Server{
    constructor(){
        this.port=process.env.PORT
        this.app = express();
        this.conectarBD();
        this.middlewares();
        this.routes();
    }
    async conectarBD(){  
        await dbConnection();     
    }
    routes(){
        this.app.use('/api/categoria',categoria)
        this.app.use('/api/usuario',usuario)
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'))
    }
    listen(){
        this.app.listen(this.port,()=> {
            console.log(`Servido corriendo en el pueto ${this.port}`);
        })
    }
}

export default Server
