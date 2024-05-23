import express, { Router } from 'express';
import { orderControllers } from './order.controller';

const orderRoute: Router = express.Router();

orderRoute.get('/', orderControllers.getOrders);
orderRoute.post('/', orderControllers.createOrder);

export default orderRoute;
