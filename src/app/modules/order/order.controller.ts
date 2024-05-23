import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.service';

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const result = await orderServices.getOrdersFromDB(email as string);

    if (result.length === 0) {
      res.status(404).json({
        success: true,
        message: 'Order not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Orders fetch failed',
      error,
    });
    return;
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;

    const { error, value } = orderValidationSchema.validate(order);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Order validation failed',
      });
      return;
    }

    const result = await orderServices.createOrderToDB(value);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order creation failed',
      error,
    });
    return;
  }
};

export const orderControllers = {
  getOrders,
  createOrder,
};
