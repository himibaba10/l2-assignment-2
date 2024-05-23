import express, { Router } from 'express';
import { productControllers } from './product.controller';

const productRoute: Router = express.Router();

productRoute.get('/', productControllers.getProducts);
productRoute.post('/', productControllers.addProduct);
productRoute.get('/:productId', productControllers.getProduct);
productRoute.put('/:productId', productControllers.updateProduct);
productRoute.delete('/:productId', productControllers.deleteProduct);

export default productRoute;
