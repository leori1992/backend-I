import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../data/products.json');
        this.products = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            await this.saveToFile();
        }
    }

    async saveToFile() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const pid = Number(id);
        const product = this.products.find(p => Number(p.id) === pid);
        if (!product) {
            throw new Error(`Producto con id ${id} no encontrado.`);
        }
        return product;
    }

    async addProduct(productData) {
        const {
            title,
            description,
            code,
            price,
            status = true,
            stock,
            category,
            thumbnails = []
        } = productData;

        if (!title || !description || !code || price === undefined || stock === undefined || !category) {
            throw new Error('Datos incompletos para crear el producto.');
        }

        const nextId = this.products.length > 0
            ? Math.max(...this.products.map(p => Number(p.id))) + 1
            : 1;

        const newProduct = {
            id: nextId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        this.products.push(newProduct);
        await this.saveToFile();
        return newProduct;
    }

    async updateProduct(id, updateData) {
        const pid = Number(id);
        const index = this.products.findIndex(p => Number(p.id) === pid);
        if (index === -1) {
            throw new Error(`Producto con id ${id} no encontrado.`);
        }

        const { id: _omit, ...dataToUpdate } = updateData;
        this.products[index] = { ...this.products[index], ...dataToUpdate };
        await this.saveToFile();
        return this.products[index];
    }

    async deleteProduct(id) {
        const pid = Number(id);
        const index = this.products.findIndex(p => Number(p.id) === pid);
        if (index === -1) {
            throw new Error(`Producto con id ${id} no encontrado.`);
        }
        this.products.splice(index, 1);
        await this.saveToFile();
    }
}

export default new ProductManager();
