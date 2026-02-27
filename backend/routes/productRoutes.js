import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Map the root of this route (which will be /api/products) to the getProducts controller
router.route('/').get(getProducts);

// Map the ID specific route to the getProductById controller
router.route('/:id').get(getProductById);

export default router;