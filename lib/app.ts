import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/retail";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    
    constructor() {
        this.app = express();
        this.config();        
        // this.app.get('/', (req, res) => {
        //     res.send('Welcome Blueberry!');
        // })
        this.routePrv.routes(this.app);     
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
//https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf