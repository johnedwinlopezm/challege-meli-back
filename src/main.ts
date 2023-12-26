import express from 'express';
import productsRoutes from './routes/products.router';
import logger from 'morgan';
import { errorHandler, logErrors } from './middlewares/error.handler';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { routerApi } from './routes';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(logger())
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.get('/', async (req, res) => {
  
    res.status(200).send('entro aca');
});
routerApi(app);
//app.use('/api', productsRoutes);
// se setea los middlewares
//app.use(logErrors);
//app.use(errorHandler);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});