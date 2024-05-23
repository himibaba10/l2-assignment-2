import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoute from './app/modules/product/product.route';

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());

//Routes
app.use('/api/products', productRoute);

// Root route for testing the server
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello! I am test route.');
});

export default app;
