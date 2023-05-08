
//Selecciona el buscar y le doy la funcion de llamar al eventhandler cuando clickeo
const botonBuscar = document.getElementById('buscar')
botonBuscar.onclick = function () { eventhandler(event) }

const eventhandler = (event) => {
  //evita que se recarge la pag
  event.preventDefault()
  //Agarra los datos del formulario
  const inputNombre = document.getElementById('input')
  const selectTipo = document.getElementById('tipo')
  const inputAño = document.getElementById('año')
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

  //Los pasa a valor para poder utilizarlos
  const t = `t=${inputNombre.value}`
  const tipo = `&type=${selectTipo.value}`
  const año = `&y=${inputAño.value}`
  //llama a la funcion buscarPelicula
  buscarPelicula(t, tipo, año)
}


const buscarPelicula = (t, tipo, año) => {
  //Selecciono la tabla de peliculas
  const tablaResultados = document.getElementById('resultados')
  //
  let apiUrl = `https://www.omdbapi.com/?apikey=a4e21d35&${t}`
  if (tipo !== '') {
    apiUrl += tipo
  }
  if (año !== '') {
    apiUrl += año
  }
  //Promesa
  fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
      
      if (res.Response === 'False') {
        const tr = document.createElement('tr')
        const tdError = document.createElement('td')
        
        tdError.colSpan = 4
        tdError.textContent = res.Error

        tr.appendChild(tdError)
        
      } else {
        
        //guarda los valores
        const titulo = res.Title
        const año = res.Year
        const tipo = res.Type
        const poster = res.Poster
       
        //Creo los elementos
        const tr = document.createElement('tr')
        const tdTitulo = document.createElement('td')
        const tdAño = document.createElement('td')
        const tdTipo = document.createElement('td')
        const tdPoster = document.createElement('td')
        const imgPoster = document.createElement('img')

        // Le da valores a los td
        tdTitulo.textContent = titulo
        tdAño.textContent = año
        tdTipo.textContent = tipo
        imgPoster.src = poster
        tdPoster.appendChild(imgPoster)

        // Agrega las celdas a la fila
        tr.appendChild(tdTitulo)
        tr.appendChild(tdAño)
        tr.appendChild(tdTipo)
        tr.appendChild(tdPoster)

        // Agrega la fila a la tabla
        tablaResultados.appendChild(tr)
      }

    })
    .catch(error => {
      tablaResultados.innerHTML = `<tr><td colspan="4">Error al buscar</td></tr>`
    })



}
