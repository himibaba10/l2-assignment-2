import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoute from './app/modules/product/product.route';
import orderRoute from './app/modules/order/order.route';

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

//Routes
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// Root route for testing the server
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to assignment 2 server');
});

app.all('*', (req: Request, res: Response): void => {
  res.send({
    success: false,
    message: 'Route not found',
  });
});

export default app;
