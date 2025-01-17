// script.js

// Variables globales
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsTableBody = document.querySelector('#results-table tbody');
const productForm = document.getElementById('product-form');
const deleteButton = document.getElementById('delete-button');
const deleteCodeInput = document.getElementById('delete-code');

// Función para buscar productos
async function searchProducts() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Por favor, ingrese un término de búsqueda.');
        return;
    }

    try {
        // Simular llamada al backend
        const response = await fetch('https://script.google.com/macros/s/AKfycbw-l4sShMoHXEqs6UmcDEKa2vL3RhV0pAI0086KA9PUqp45AKQV9atQTolurJHtcys7lA/exec', {
            method: 'POST',
            body: JSON.stringify({ action: 'search', query }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const products = await response.json();

        // Limpiar la tabla de resultados
        resultsTableBody.innerHTML = '';

        // Mostrar los resultados en la tabla
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.photo}" alt="Foto" width="50"></td>
                <td>${product.code}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.color}</td>
                <td>${product.size}</td>
                <td>${product.price}</td>
                <td>${product.location}</td>
                <td>
                    <button onclick="editProduct('${product.code}')">Editar</button>
                    <button onclick="deleteProduct('${product.code}')">Eliminar</button>
                </td>
            `;
            resultsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al buscar productos:', error);
    }
}

// Función para guardar un producto
async function saveProduct(event) {
    event.preventDefault();

    const productData = {
        code: document.getElementById('product-code').value.trim(),
        brand: document.getElementById('product-brand').value.trim(),
        model: document.getElementById('product-model').value.trim(),
        color: document.getElementById('product-color').value.trim(),
        size: document.getElementById('product-size').value.trim(),
        price: parseFloat(document.getElementById('product-price').value),
        location: document.getElementById('product-location').value.trim(),
        photo: document.getElementById('product-photo').files[0]?.name || ''
    };

    try {
        // Simular llamada al backend
        await fetch('https://your-google-apps-script-url', {
            method: 'POST',
            body: JSON.stringify({ action: 'save', product: productData }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        alert('Producto guardado con éxito.');
        productForm.reset();
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
}

// Función para eliminar un producto
async function deleteProduct(code) {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;

    try {
        // Simular llamada al backend
        await fetch('https://your-google-apps-script-url', {
            method: 'POST',
            body: JSON.stringify({ action: 'delete', code }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        alert('Producto eliminado con éxito.');
        searchProducts();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

// Event Listeners
searchButton.addEventListener('click', searchProducts);
productForm.addEventListener('submit', saveProduct);
deleteButton.addEventListener('click', () => deleteProduct(deleteCodeInput.value.trim()));
