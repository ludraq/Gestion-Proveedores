// Configuración de la API de Google Sheets
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwAjn_2XF9--7fyC2YCIH5ynffxC7OzP2Q8Wf987co2u47ZyD-G3CHiosIDM6uEVoSZog/exec ';

// Función para buscar productos
async function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  try {
    const response = await fetch(`${SCRIPT_URL}?action=search&term=${searchTerm}`);
    const data = await response.json();
    
    displayResults(data);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    alert('Error al buscar productos. Por favor, intenta de nuevo.');
  }
}

// Función para mostrar los resultados
function displayResults(products) {
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <img src="${product.imagen}" alt="${product.modelo}">
      <div class="product-info">
        <p><strong>Código:</strong> ${product.codigo}</p>
        <p><strong>Marca:</strong> ${product.marca}</p>
        <p><strong>Modelo:</strong> ${product.modelo}</p>
        <p><strong>Precio:</strong> $${product.precio}</p>
        <p><strong>Local:</strong> ${product.local}</p>
      </div>
    `;
    
    container.appendChild(productCard);
  });
}

// Función para mostrar/ocultar el formulario
function toggleForm() {
  const form = document.getElementById('productForm');
  form.classList.toggle('hidden');
}

// Función para guardar un nuevo producto
async function saveProduct(event) {
  event.preventDefault();
  
  const productData = {
    codigo: document.getElementById('codigo').value,
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    precio: document.getElementById('precio').value,
    local: document.getElementById('local').value,
    imagen: document.getElementById('imagen').value
  };
  
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'add',
        data: productData
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Producto guardado exitosamente');
      document.getElementById('newProductForm').reset();
      toggleForm();
    } else {
      alert('Error al guardar el producto');
    }
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    alert('Error al guardar el producto. Por favor, intenta de nuevo.');
  }
}

// Función para eliminar un producto
function deleteProduct() {
  const codigo = document.getElementById('codigo').value;
  
  if (!codigo) {
    alert('Por favor, ingresa un código de producto para eliminar');
    return;
  }
  
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    // Implementar la llamada a la API para eliminar el producto
    fetch(`${SCRIPT_URL}?action=delete&codigo=${codigo}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('Producto eliminado exitosamente');
        document.getElementById('newProductForm').reset();
        toggleForm();
      } else {
        alert('Error al eliminar el producto');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto. Por favor, intenta de nuevo.');
    });
  }
}

// Función para descartar cambios
function discardChanges() {
  document.getElementById('newProductForm').reset();
  toggleForm();
}

// Event Listeners
document.getElementById('newProductForm').addEventListener('submit', saveProduct);
