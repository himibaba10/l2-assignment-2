import { TProduct } from './product.interface';
import { Product } from './product.model';

const getProductsFromDB = async (): Promise<TProduct[]> => {
  try {
    const result = await Product.find();
    return result;
  } catch (error) {
    throw Error('Could not get products');
  }
};

const getProductFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  try {
    const result = await Product.findOne({ _id: productId });
    return result;
  } catch (error) {
    throw Error('Could not get the product');
  }
};

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

export const productServices = {
  insertProductToDB,
  getProductsFromDB,
  getProductFromDB,
};
