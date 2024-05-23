import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

const GetProducts = async (
  req: Request,
  res: Response,
): Promise<void | undefined> => {
  try {
    //   Get the result from product service
    const result = await productServices.getProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
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

const GetProduct = async (
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
      message: 'Product fetched successfully',
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

const AddProduct = async (
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
      message: 'Product inserted successfully',
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

export const productControllers = {
  AddProduct,
  GetProducts,
  GetProduct,
};
