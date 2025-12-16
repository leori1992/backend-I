const socket = io();
const $list = document.getElementById('product-list');
const $create = document.getElementById('create-form');
const $delete = document.getElementById('delete-form');
const $messages = document.getElementById('messages');

function showMessage(type, text) {
  if (!$messages) return;
  $messages.textContent = text;
  $messages.style.color = type === 'error' ? 'red' : 'green';
}

function render(products) {
  if (!$list) return;
  $list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.innerHTML = `<strong>${p.title}</strong> - ${p.description} - $${p.price} - Stock: ${p.stock}`;
    $list.appendChild(li);
  });
}

socket.on('productsUpdated', (products) => {
  render(products);
  showMessage('success', 'Lista actualizada');
});

socket.on('errorMessage', (msg) => {
  showMessage('error', msg);
});

if ($create) {
  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData($create).entries());
    const statusChecked = $create.querySelector('input[name="status"]').checked;
    data.price = Number(data.price);
    data.stock = Number(data.stock);
    data.status = statusChecked;
    data.thumbnails = (data.thumbnails || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!data.title || !data.description || !data.code || !data.category) {
      showMessage('error', 'Completa todos los campos obligatorios');
      return;
    }
    if (Number.isNaN(data.price) || data.price <= 0) {
      showMessage('error', 'Precio debe ser un número mayor a 0');
      return;
    }
    if (Number.isNaN(data.stock) || data.stock < 0) {
      showMessage('error', 'Stock debe ser un número 0 o mayor');
      return;
    }

    socket.emit('createProduct', data);
    showMessage('success', 'Creación enviada');
    $create.reset();
  });
}

if ($delete) {
  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Number(new FormData($delete).get('id'));
    if (Number.isNaN(id) || id <= 0) {
      showMessage('error', 'ID inválido');
      return;
    }
    socket.emit('deleteProduct', id);
    showMessage('success', 'Eliminación enviada');
    $delete.reset();
  });
}
