// src/routes/product.routes.js
const { Router } = require('express');
const productController = require('../controllers/product.controller');

// Creamos una instancia del router de Express
const router = Router();

// Definimos las rutas y las conectamos a las funciones del controlador
router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

// Exportamos el router para que app.js pueda usarlo
module.exports = router;