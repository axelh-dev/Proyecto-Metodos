document
  .getElementById("secante-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const equation = document.getElementById("equation").value;
    const xo = parseFloat(document.getElementById("xo").value);
    const xi = parseFloat(document.getElementById("xi").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    /* Llamamos nuestro metodo y le pasamos los valores que vienen de los imputs */
    let resultados = biseccion(equation, xo, xi, tolerance);

    // Aca limpiamos la tabla antes de mandar nuevos valores a ella
    const tabla = document.getElementById("tabla-resultados");
    const filas = tabla.rows;
    const numFilas = filas.length;
    for (let i = numFilas - 1; i > 0; i--) {
      tabla.deleteRow(i);
    }
    const tablaResultados = document.getElementById("tabla-resultados");

    // Agregamos una fila por cada resultado en el arreglo
    resultados.forEach((resultado) => {
      const fila = document.createElement("tr");

      // Agregamos una celda por cada valor en el resultado
      resultado.forEach((valor) => {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });

      tablaResultados.appendChild(fila); // Agregamos la fila a la tabla
    });

    // Definir la ecuacion a resolver utilizando math.js
    function biseccion(funcion, xo, xi, tolerance) {
      let resultados = [];
      let fxo = math.evaluate(funcion, { x: xo });

      let fxi = math.evaluate(funcion, { x: xi });

      /* Calculamos la recurrencia */
      let xr = xi - (fxi * (xo - xi)) / (fxo - fxi);
      /* Sustituimos recurrencia en nuestra ecuacion */
      let fxr = math.evaluate(funcion, { x: xr });

      let iteracion = 1;
      let toll = 0;
      /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
      let xrAnterior = 0;
      while (Math.abs(fxr) > tolerance) {
        resultados.push([
          iteracion,
          xo.toFixed(6),
          xi.toFixed(6),
          fxo.toFixed(6),
          fxi.toFixed(6),
          xr.toFixed(6),
          toll.toFixed(6),
        ]); // guardamos los resultados

        // Actualizamos los nuevos valores
        xo = xi;
        xi = xr;

        xrAnterior = xr; // actualizamos xrAnterior con el valor actual de xr

        fxo = math.evaluate(funcion, { x: xo });

        fxi = math.evaluate(funcion, { x: xi });

        fxr = math.evaluate(funcion, { x: xr });

        xr = xi - (fxi * (xo - xi)) / (fxo - fxi);

        iteracion++;

        const diffXr = Math.abs(xr - xrAnterior); // calculamos la diferencia entre xr actual y xr anterior
        toll = diffXr; // actualizamos la tolerancia con la diferencia de xr
        toll;
      }
      resultados.push([
        iteracion,
        xo.toFixed(6),
        xi.toFixed(6),
        fxo.toFixed(6),
        fxi.toFixed(6),
        xr.toFixed(6),
        toll.toFixed(6),
      ]); // guardamos los resultados


      return resultados;
    }
  });
