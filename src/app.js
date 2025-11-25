// src/app.js
const express = require('express');
const productController = require('./controllers/product.controller');
const cartController = require('./controllers/cart.controller');

const app = express();

// Middleware para que Express entienda JSON en el body de las peticiones
// ¡Esencial para que req.body funcione en POST y PUT!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Practica Backend API',
        endpoints: {
            products: '/api/products',
            carts: '/api/carts'
        }
    });
});

// Montamos las rutas de productos en /api/products
// Ahora cualquier petición a /api/products/ será manejada por productRoutes
app.get('/api/products', productController.getProducts);
app.get('/api/products/:pid', productController.getProductById);
app.post('/api/products', productController.addProduct);
app.put('/api/products/:pid', productController.updateProduct);
app.delete('/api/products/:pid', productController.deleteProduct);

app.post('/api/carts', cartController.createCart);
app.get('/api/carts/:cid', cartController.getCartById);
app.post('/api/carts/:cid/product/:pid', cartController.addProductToCart);

module.exports = app;
