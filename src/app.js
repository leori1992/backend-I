import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import viewsRoutes from './routes/views.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


export default app;
