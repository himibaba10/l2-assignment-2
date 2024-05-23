import express, { Router } from 'express';
import { productControllers } from './product.controller';

const productRoute: Router = express.Router();

productRoute.get('/', productControllers.GetProducts);
productRoute.post('/', productControllers.AddProduct);
productRoute.get('/:productId', productControllers.GetProduct);

export default productRoute;
