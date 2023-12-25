import express from 'express';
import productsRoutes from './routes/products.router';
import  morgan from 'morgan';
import {errorHandler,logErrors} from './middlewares/error.handler';
import cors from 'cors';
const app = express();
const port = 3000;


app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use('/', productsRoutes); 
// se setea los middlewares
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});