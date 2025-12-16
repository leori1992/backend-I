
import app from './src/app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import productManager from './src/dao/ProductManager.js';
import { setIO } from './src/socket.js';

const PORT = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);
setIO(io);

io.on('connection', socket => {
  socket.emit('productsUpdated', productManager.getProducts());
  socket.on('createProduct', async data => {
    try {
      await productManager.addProduct(data);
      io.emit('productsUpdated', productManager.getProducts());
    } catch (error) {
      socket.emit('errorMessage', error.message);
    }
  });
  socket.on('deleteProduct', async id => {
    try {
      await productManager.deleteProduct(Number(id));
      io.emit('productsUpdated', productManager.getProducts());
    } catch (error) {
      socket.emit('errorMessage', error.message);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
