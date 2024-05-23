import { TOrder } from './order.interface';
import Order from './order.model';

const getOrdersFromDB = async (
  email: string | undefined,
): Promise<TOrder[]> => {
  try {
    let query: { email?: string } = {};

    if (email) {
      query.email = email;
    }

    const result = await Order.find(query);
    return result;
  } catch (error) {
    throw Error('Could not get orders');
  }
};

const createOrderToDB = async (orderData: TOrder): Promise<TOrder> => {
  try {
    const result = await Order.create(orderData);
    return result;
  } catch (error) {
    throw Error('Could not create order');
  }
};

export const orderServices = { getOrdersFromDB, createOrderToDB };
