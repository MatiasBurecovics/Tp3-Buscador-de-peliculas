const botonBuscar = document.getElementById('buscar');

const buscarPeliculas = () => {
    const inputNombre = document.getElementById('input');
const selectTipo = document.getElementById('tipo');
const inputAño = document.getElementById('año');
if (!inputNombre.value) {
    alert('Por favor ingrese el título de la película');
    return;
  }
const tablaResultados = document.getElementById('resultados');


const t = `t=${inputNombre.value}`;
const tipo = `&type=${selectTipo.value}`;
const año = `&y=${inputAño.value}`;

  let apiUrl = `https://www.omdbapi.com/?apikey=a4e21d35&${t}`;
  if (selectTipo.value !== '') {
    apiUrl += tipo;
  }
  if (inputAño.value !== '') {
    apiUrl += año;
  }
  console.log(apiUrl)
  fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
      if (res.Response === 'False') {
        tablaResultados.innerHTML = `<tr><td colspan="4">${res.Error}</td></tr>`;
      } else {

        const pelicula = res.Title;
        const año = res.Year;
        const tipo = res.Type;
        const poster = res.Poster;
        tablaResultados.innerHTML = `
          <tr>
            <td>${pelicula}</td>
            <td>${año}</td>
            <td>${tipo}</td>
            <td><img src="${poster}" alt="Poster"></td>
          </tr>
        `;
      }
    })
    .catch(error => {
 
      tablaResultados.innerHTML = `<tr><td colspan="4">Error al buscar las películas</td></tr>`;
    });
};

botonBuscar.addEventListener('click', buscarPeliculas);

