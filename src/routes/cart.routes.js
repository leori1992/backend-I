import { Router } from 'express';
import cartController from '../controllers/cart.controller.js';

const router = Router();

router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCartById);
router.post('/:cid/product/:pid', cartController.addProductToCart);

export default router;
