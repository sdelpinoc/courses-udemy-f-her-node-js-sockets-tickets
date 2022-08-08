import express from 'express';
import cors from 'cors';
import http from 'http';

import { Server as ServerIo } from 'socket.io';

import { path, __dirname } from '../helpers/index.js';

import { validateJSON } from '../middlewares/index.js';
import { socketController } from '../sockets/controller.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // socket.io
        this.server = http.createServer(this.app);
        this.io = new ServerIo(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and parse of the body(The Content-Type of the request must be json)
        this.app.use(express.json());

        // Public directory, we set "the root" directory for our application
        this.app.use(express.static('public'));

        // Check format JSON body
        this.app.use(validateJSON);
    }

    routes() {

        this.app.use('/*', (req, res, next) => {
            // console.log('404');
            // res.status(404).json({
            //     msg: '404 - Page not found'
            // });
            // res.sendFile('/views/404.html');

            res.sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        // this.app.listen(this.port, () => {
        //     console.log('Server running in PORT: ', this.port);
        // });

        // socket.io
        this.server.listen(this.port, () => {
            console.log('Server running in PORT: ', this.port);
        });
    }
}