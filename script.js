const inicio = document.getElementById('ingreso').innerHTML = `Inserte su busqueda en el buscador`

//Nombre 
//type 
//Año 

const busquedaApi = () => {

    const inputNombre = document.getElementById('inputNombre').value;
    //const inputTipo = document.getElementById('inputTipo').value;
    //const inputAño = document.getElementById('inputAño').value;
    const t = `t=${inputNombre}`
    //const y = `y=${inputAño}`
    //const type = `type=${inputTipo}`
    const apiUrl = `http://www.omdbapi.com/?apikey=ff89313c&${t}`;
   if(y.lenght > 2) {
        
    }
    if (type.lenght > 5 ) {
        
    }
    console.log(apiUrl)
    fetch(apiUrl)
        .then(res => res.json())
        .then(res => { 
            var filtradoSearch = res[0];
            console.log(res)})
        .catch(err => console.error(`La pelicula no se encontro`, err));

};
