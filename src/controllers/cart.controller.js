import CartManager from '../dao/CartManager.js';
import productManager from '../dao/ProductManager.js';

const cartManager = new CartManager();

const createCart = async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json({ message: 'Carrito creado con éxito', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = cartManager.getCartById(parseInt(cid));
        res.status(200).json({ products: cart.products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
        console.log('[CartController] addProductToCart called');
        const { cid, pid } = req.params;
        await productManager.init();
        const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        const status = /no encontrado/i.test(error.message) ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
};

export default {
    createCart,
    getCartById,
    addProductToCart,
};
