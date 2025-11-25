const { Router } = require('express');
const cartController = require('../controllers/cart.controller');

const router = Router();

router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCartById);
router.post('/:cid/product/:pid', cartController.addProductToCart);

module.exports = router;
