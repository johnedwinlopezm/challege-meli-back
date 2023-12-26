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
    const { name, lastname } = req.headers;
    productService.getProducts(q.toString(), name.toString(), lastname.toString()).then((response) => {
      res.status(200).json(response);
    }
    ).catch(error => {
      res.status(400).json(error);
    }
    );
  } else {
    res.status(200).send('producto nulo');
  }
});

router.get('/items/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { name, lastname } = req.headers;
    productService.getDescriptionItem(id.toString(), name.toString(), lastname.toString()).then((response) => {
      res.status(200).json(response);
    }
    ).catch(error => {
      res.status(400).json(error);
    }
    );
  } else {
    res.status(201).send('item nulo');
  }
});

export default router;