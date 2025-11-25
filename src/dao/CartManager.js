const fs = require('fs/promises');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            await this.saveToFile();
        }
    }

    async saveToFile() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    getCartById(id) {
        const cid = Number(id);
        const cart = this.carts.find(c => Number(c.id) === cid);
        if (!cart) {
            throw new Error(`Carrito con id ${id} no encontrado.`);
        }
        return cart;
    }

    async createCart() {
        const nextId = this.carts.length > 0
            ? Math.max(...this.carts.map(c => Number(c.id))) + 1
            : 1;
        const newCart = { id: nextId, products: [] };
        this.carts.push(newCart);
        await this.saveToFile();
        return newCart;
    }

    async addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        const pid = Number(productId);
        const index = cart.products.findIndex(p => Number(p.product) === pid);
        if (index === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[index].quantity += 1;
        }
        await this.saveToFile();
        return cart;
    }
}

module.exports = CartManager;
