import { TProduct } from './product.interface';
import { Product } from './product.model';

const insertProductToDB = async (
  productData: TProduct,
): Promise<TProduct | undefined> => {
  try {
    const result = await Product.create(productData);

    // Return the result to product controller
    return result;
  } catch (error) {
    throw Error('Product could not be created');
  }
};

export const productServices = { insertProductToDB };
