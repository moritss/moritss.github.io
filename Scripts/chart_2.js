// Crear un parser de CSV con el delimitador punto y coma
const csvParser = d3.dsvFormat(";");

// Solicitar el archivo CSV usando la función fetch()
fetch('CSVS/cant_por_dia.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parsear los datos del CSV
    const data = csvParser.parse(csvData, d3.autoType);

    // Crear una escala de banda personalizada para el eje X
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.dia))
      .padding(0.1);

    // Crear una escala de colores YlOrBr
    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.cantidad)])
      .interpolator(d3.interpolateOranges);

    // Crear el gráfico de barras
    const chart = Plot.plot({
        marginBottom: 12,
        marginTop: 10,
        style: {
            fontSize: "22",
            fontFamily: "Lato, sans-serif",
          },
     
  y:{
    fontSize: 10,
    label: "↑ Cantidad de denuncias",
    axis:null,
  },
  
  
  x: {
    transform: xScale, // Usar la escala de banda personalizada
    axis: null, // Eliminar el eje X predeterminado
  },
  marks: [
    Plot.barY(data, {
      x: "dia",
      y: "cantidad",
      fill: (d) => colorScale(d.cantidad), // Usar la escala de colores YlOrBr
      title: (d) => `Cantidad: ${d.cantidad}`,
    }),
    Plot.text(data, {
      x: "dia",
      y: (d) => d.cantidad + 5,
      text: (d) => {
        if (d.dia === "Miercoles") {
          return d.cantidad;
        } else {
          return null;
        }
      },
      fontFamily: "Lato, sans-serif",
      fontSize: 20,
      fontWeight:  "bold",
      textAnchor: "middle",
    }),
    Plot.text(data, {
      x: "dia",
      y: (d) => d.cantidad + 5,
      text: (d) => d.cantidad,
      textAnchor: "middle",
      fontFamily: "Lato, sans-serif",
      fontSize: 20,
    }),
    
    // Agregar etiquetas de texto debajo de las barras
    Plot.text(data, {
      x: "dia",
      y: -8,
      text: "dia",
      fill: "black",
      textAnchor: "middle",
      font: "Lato , sans-serif",
      fontSize: 18,
    }),
  ],
  


    });

    // Agregar el gráfico al elemento con id "chart"
    document.getElementById("chart_2").appendChild(chart);
  });
