import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

const getProducts = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    const { searchTerm } = req.query;

    //   Get the result from product service
    const result = await productServices.getProductsFromDB(
      searchTerm as string,
    );

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch products',
      error,
    });
  }
};

const getProduct = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    const { productId } = req.params;

    //   Get the result from product service
    const result = await productServices.getProductFromDB(productId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Could not find the product',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch the product',
      error,
    });
  }
};

const addProduct = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    const { product } = req.body;

    const { error, value } = productValidationSchema.validate(product);

    // If product data is not valid
    if (error) {
      res
        .status(500)
        .json({ success: false, error: 'Product data is not valid' });
      return;
    }

    //   Get the result from product service
    const result = await productServices.insertProductToDB(value);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not insert product',
      error,
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    const { productId } = req.params;
    const { product } = req.body;

    const { error, value } = productValidationSchema.validate(product);

    if (error) {
      res
        .status(500)
        .json({ success: false, error: 'Product data is not valid' });
      return;
    }

    //   Get the result from product service
    const result = await productServices.updateProductInDB(productId, value);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Could not update product',
      error,
    });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    const { productId } = req.params;
    await productServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not delete product',
      error,
    });
  }
};

export const productControllers = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
