import { TProduct } from './product.interface';
import { Product } from './product.model';

const getProductsFromDB = async (
  searchTerm: string | undefined,
): Promise<TProduct[]> => {
  try {
    const query: { name?: RegExp } = {};

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      query.name = searchRegex;
    }

    const result = await Product.find(query);
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

const updateProductInDB = async (
  productId: string,
  productData: TProduct,
): Promise<TProduct | null> => {
  try {
    const result = await Product.findOneAndUpdate(
      { _id: productId },
      productData,
      { new: true },
    );
    return result;
  } catch (error) {
    throw Error('Product could not be updated');
  }
};

const deleteProductFromDB = async (
  productId: string,
): Promise<{ success: boolean }> => {
  try {
    await Product.deleteOne({ _id: productId });
    return { success: true };
  } catch (error) {
    throw Error('Product could not be deleted');
  }
};

export const productServices = {
  insertProductToDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
