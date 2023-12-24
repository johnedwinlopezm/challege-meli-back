import { Router} from 'express';
import { Search } from '../models/search';
import { ProductsService } from '../services/products.service';
import { validateAuthorization } from '../middlewares/error.handler';

const router = Router();
const productService = new ProductsService();
let search: Search;

router.get('/items', validateAuthorization,async (req, res) => {
    const { q } = req.query;
   if(q) {
    const data = await productService.getProducts(q.toString());
    res.status(201).json(data);
   } else {
    res.status(201).send('producto nulo');
   } 
  });

export default router;