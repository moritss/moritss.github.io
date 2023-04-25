const mapaFetch = d3.json('CSVS/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'CSVS/147_vehiculos_mal_estacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  const colorScale = d3.scaleSequential()
  .domain([0, d3.max(data, d => d.cantidad)])
  .interpolator(d3.interpolateYlOrBr);
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    width: 350,
    height: 350,
    style: {
      fontSize: "20",
      fontFamily: "Lato, sans-serif",
    },
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 7,
      scheme: 'Oranges',
      label: 'Cantidad de denuncias',
      legend: true,
      style: {
        position: "relative", // Agrega posición relativa al legend
        right: "300px", // Ajusta la posición desde la derecha
      },
      
      
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: "gray",
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "white",
          textAnchor: "center",
          fontSize: "11",
          fontFamily: "Lato, sans-serif",
          filter: (d) => d.properties.DENUNCIAS > 1200
        })
      )
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_1').append(() => chartMap)


})

