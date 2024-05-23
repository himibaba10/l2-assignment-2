import express, { Router } from 'express';
import { productControllers } from './product.controller';

const productRoute: Router = express.Router();

productRoute.post('/', productControllers.AddProduct);

export default productRoute;
