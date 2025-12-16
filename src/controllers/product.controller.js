// src/controllers/product.controller.js
import productManager from '../dao/ProductManager.js';
import { getIO } from '../socket.js';

// Creamos una única instancia de ProductManager para que todos los controladores la usen.

const getProducts = async (req, res) => {
    try {
        // Llama al método del manager y devuelve la lista de productos.
        const products = productManager.getProducts();
        res.status(200).json({ products });
    } catch (error) {
        // Si algo falla, devuelve un error 500 (error del servidor).
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
      
        const { pid } = req.params;
        const product = productManager.getProductById(parseInt(pid)); 
        res.status(200).json({ product });
    } catch (error) {
     
        res.status(404).json({ error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        const io = getIO();
        if (io) io.emit('productsUpdated', productManager.getProducts());
        res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await productManager.updateProduct(parseInt(pid), req.body);
        res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
        // Puede ser un 404 si no lo encuentra, o un 400 si el body es inválido.
        res.status(404).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(parseInt(pid));
        const io = getIO();
        if (io) io.emit('productsUpdated', productManager.getProducts());
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Exportamos todas las funciones para que las pueda usar el router
export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
