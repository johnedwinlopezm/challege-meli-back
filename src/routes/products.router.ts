import { Router } from 'express';
import { SearchResponse } from '../models/searchResponse';
import { ProductsService } from '../services/products.service';
import { validateAuthorization } from '../middlewares/error.handler';

const router = Router();
const productService = new ProductsService();
let search: SearchResponse;

router.get('/items', validateAuthorization, async (req, res) => {
  const { q } = req.query;
  if (q) {
    const data = await productService.getProducts(q.toString());
    res.status(201).json(data);
  } else {
    res.status(201).send('producto nulo');
  }
});

router.get('/items/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  if (id) {
    const data = await productService.getDescriptionItem(id.toString());
    res.status(201).json(data);
  } else {
    res.status(201).send('item nulo');
  }
});

export default router;