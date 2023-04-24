const inicio = document.getElementById('ingreso').innerHTML = `Inserte su busqueda en el buscador`


const busquedaApi=()=> {

    const input = document.getElementById('input').value;
    console.log(input)
    const t = `t=${input}`
    const apiUrl = `http://www.omdbapi.com/?apikey=ff89313c&${t}`;
    
    fetch(apiUrl)
    .then(res=>res.json())
     .then(data=> 
        {
            if (data.res && data.res.length > 0) {
                let filtradoSearch = data.res[0];
             
              } else {
                document.getElementById("ingreso").innerHTML = `La pelicula no se encontro`;
              }
        
 {
            
            const { poster_path, title, overview, vote_average, vote_count, release_date } = filtradoSearch;

            document.getElementById("ingreso")
            .innerHTML = `
            <style>
            body::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                filter: opacity(.1) grayscale(100%) contrast(130%);
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                background: url(https://image.tmdb.org/t/p/w500${poster_path});
            }
            </style>
            <div class="resultado-api">
                <div class="imagen-portada"><img src="https://image.tmdb.org/t/p/w500${poster_path}" /></div>
                <div class="datos-api"><h2>${title}</h2>
                <div class="datos-api2"><h1>${overview}</h1>
                      <span>
                      <div id="estrellas"></div>
                      Estrellas: ${vote_average}<br />
                      Año: ${release_date}<br />
                      Votos: ${vote_count}<br />
                      </span>
                </div>
                </div>
            </div>
            `;

        }


    console.log(`test ${filtradoSearch.id}`)
    })
    .catch(error => console.error(error));

};
