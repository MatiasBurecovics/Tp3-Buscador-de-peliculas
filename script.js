
//Selecciona el buscar y le doy la funcion de llamar al eventhandler cuando clickeo
const botonBuscar = document.getElementById('buscar')
botonBuscar.onclick = function () { eventhandler(event) }

const temporada = document.getElementById('tipo')
temporada.onclick = function() {season() }

const season = () =>{ 
if (document.getElementById('tipo').value == "episode") {
  document.getElementById('temporada').type = "text"
  document.getElementById('episodio').type = "text"
  document.getElementById('temp').style.display = "block"
  document.getElementById('ep').style.display = "block";
}
else{
  document.getElementById('temporada').type = "hidden"
  document.getElementById('episodio').type = "hidden"
  document.getElementById('temp').style.display = "none";
  document.getElementById('ep').style.display = "none";
}
}


const eventhandler = (event) => {
  //evita que se recarge la pag
  event.preventDefault()
  //Agarra los datos del formulario
  const inputNombre = document.getElementById('input')
  const selectTipo = document.getElementById('tipo')
  const inputAño = document.getElementById('año')
  const inputTemporada = document.getElementById('temporada')
  const inputEpisodio= document.getElementById('episodio')
  //verifica los datos esten bien
  if (!inputNombre.value) {
    alert('Por favor ingrese el título de la película')
    return
  }
  //^ marca el comienzo de la cadena.
  //$ marca el final de la cadena.
  //[0-9] indica el rango de valores posible para cada posicion de la string
  //* indica que se cumpla 0 o más veces
  //.test aplica el regex a una string y devuelve true o false
  const regex = /^[0-9]*$/
  const onlyNumbers = regex.test(inputAño.value)
  if (inputAño.value && !onlyNumbers) {
    alert('Por favor ingrese un año valido')
    return
  }
  if (inputTemporada.value && !onlyNumbers) {
    alert('Por favor ingrese una temporada valida')
    return
  }
  if (inputEpisodio.value && !onlyNumbers) {
    alert('Por favor ingrese un Episodio valido')
    return
  }

  //Los pasa a valor para poder utilizarlos
  const t = `t=${inputNombre.value}`
  const tipo = `&type=${selectTipo.value}`
  const año = `&y=${inputAño.value}`
  const temporada = `&season=${inputTemporada.value}`
  const episodio = `&episode=${inputEpisodio.value}`
  //llama a la funcion buscarPelicula
  buscarPelicula(t, tipo, año,temporada, episodio)
}


const buscarPelicula = (t, tipo, año, temporada, episodio) => {
  //Selecciono la tabla de peliculas
  const tablaResultados = document.getElementById('resultados')
  
  let apiUrl = `https://www.omdbapi.com/?apikey=a4e21d35&${t}`
  if (temporada !== `&season=`) {
    apiUrl += temporada
  }
  if (episodio !== `&episode=`) {
    apiUrl += episodio
  }
  if (tipo !== `&type=`) {
    apiUrl += tipo
  }
  if (año !== `&y=`) {
    apiUrl += año
  }
  

  //Promesa
  fetch(apiUrl)
  
    .then(res => res.json())
    .then(res => {
      console.log(res)
      const tr = document.createElement('tr')
      if (res.Response == 'False') {

        
        const tdError = document.createElement('td')

        tdError.colSpan = 4
        tdError.textContent = res.Error

        tr.appendChild(tdError)
        
      }
      else {
        
        //guarda los valores
        const titulo = res.Title
        const año = res.Year
        const tipo = res.Type
        const poster = res.Poster
        
        //Creo los elementos
        
        const tdTitulo = document.createElement('td')
        const tdAño = document.createElement('td')
        const tdTipo = document.createElement('td')
        const tdPoster = document.createElement('td')
        const tdBoton = document.createElement('td')

        const imgPoster = document.createElement('img')
        const btnDetalle = document.createElement('button')
        
        // Le da valores a los td
        tdTitulo.textContent = titulo
        tdAño.textContent = año
        tdTipo.textContent = tipo
        imgPoster.src = poster
        btnDetalle.textContent = 'Ver Detalles'
        btnDetalle.onclick =  function() {DetallePelicula(res.Actors,res.Runtime,res.imdbRating, res.Released, res.Writer, res.Country,res.Genre,res.Plot)}        
        tdPoster.appendChild(imgPoster)
        tdBoton.appendChild(btnDetalle)

        // Agrega las celdas a la fila
        tr.appendChild(tdTitulo)
        tr.appendChild(tdAño)
        tr.appendChild(tdTipo)
        tr.appendChild(tdPoster)
        tr.appendChild(tdBoton)
        
        
      }
      // Agrega la fila a la tabla
      tablaResultados.appendChild(tr)
    })
    .catch(error => {
      const tr = document.createElement('tr')
      const tdError = document.createElement('td')

      tdError.colSpan = 4
      tdError.textContent = 'Error en la Busqueda'

      tr.appendChild(tdError)
      tablaResultados.appendChild(tr)
    })
}
const DetallePelicula = (Actors,Runtime,imdbRating, Released, Writer, Country,Genre,Plot) =>
{

  localStorage.setItem("Actors", Actors);
  localStorage.setItem("Runtime", Runtime);
  localStorage.setItem("imdbRating", imdbRating);
  localStorage.setItem("Released", Released);
  localStorage.setItem("Writer", Writer);
  localStorage.setItem("Country", Country);
  localStorage.setItem("Genre", Genre);
  localStorage.setItem("Plot", Plot);
  window.location.href = 'Detalle.html';

}

