import { Router } from 'express';
import productManager from '../dao/ProductManager.js';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('home', { products: productManager.getProducts() });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.getProducts() });
});

export default router;
