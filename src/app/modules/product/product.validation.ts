import Joi from 'joi';
import { TInventory, TProduct, TVariant } from './product.interface';

const variantValidationSchema = Joi.object<TVariant>({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventoryValidationSchema = Joi.object<TInventory>({
  quantity: Joi.number().integer().min(0).required(),
  inStock: Joi.boolean().required(),
});

const productValidationSchema = Joi.object<TProduct>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantValidationSchema).required(),
  inventory: inventoryValidationSchema.required(),
});

export default productValidationSchema;
