import express, {Application} from 'express';

import productsRouter from './routes/product.routes';



export class App{
    private app: Application
    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/products',productsRouter);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server is running in port: ',this.app.get('port'))
    }
};
