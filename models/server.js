const express = require('express');
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        //middlewares
        this.middleware();
        //routes app
        this.routes();
    }
    
    middleware(){
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static('public'));
    }

    routes () {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listem() {
        this.app.listen(this.port, () =>{
            console.log(`roning server in http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;