// src/app.js
const express = require('express');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

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
app.use('/api/products', productRoutes);

app.use('/api/carts', cartRoutes);

module.exports = app;
