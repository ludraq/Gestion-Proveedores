let data = []; // Aqui almacenaremos los datos de la hoja calculos de google sheets
// funcion que consulta los datos desde google sheets (googleapps script)
async function loadData(){
    const response = await fetch('https://script.google.com/macros/s/AKfycbwAjn_2XF9--7fyC2YCIH5ynffxC7OzP2Q8Wf987co2u47ZyD-G3CHiosIDM6uEVoSZog/exec'); // Aqui va la url de la hoja de apps script
    data = await response.json();
}
// funcion de busqueda 
function search(){
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = data.filter(item => item.codigo.toLowerCase().includes(query) || item.marca.toLowerCase().includes(query) || item.local.toLowerCase().includes(query));
    displayResults(results); 
}
// Funcion para mostrar los resultados
function displayResults(results){
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ""; // Limpiar resultados

    if(results.lenght === 0){
        resultsContainer.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }
    results.forEach(item => {
        const resultItem = `<div class="col-md-4">}
            <div class="card">
                <img src="item.imagen" class="card-img-top" alt="{item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">item.nombre</h5>
                    <p><strong>Codigo</strong>{item.codigo}</p>
                    <p><strong>marca</strong>{item.marca}</p>
                    <p><strong>talla</strong>{item.talla}</p>
                    <p><strong>precio</strong>{item.precio}</p>
                    <p><strong>local</strong>{item.local}</p>
                    <p><strong>nombre</strong>{item.nombre}</p>
                </div>
            </div>      
        </div>`;
        resultsContainer.innerHTML += resultItem;
    });
}
// Cargar los datos al inicio
loadData();