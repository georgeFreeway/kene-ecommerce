import express from 'express';
const productRouter = express.Router();
import { findAllProducts, findSingleProduct } from '../controllers/product.controller';

productRouter.get('/products', findAllProducts);
productRouter.get('/products/:id', findSingleProduct);


export default productRouter;