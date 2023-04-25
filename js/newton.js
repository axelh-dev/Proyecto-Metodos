document
  .getElementById("newton-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const equation = document.getElementById("equation").value;
    const xi = parseFloat(document.getElementById("xi").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    /* Llamamos nuestro metodo y le pasamos los valores que vienen de los imputs */
    const resultados = newton(equation, xi, tolerance);

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
    function newton(funcion, xi, tolerance) {
      let resultados = [];

      // Obtenemos la derivada de nuestra funcion devulve una funcion tipo node
      let eqDer = math.derivative(funcion, "x");

      // Convertimos el objeto Node a una cadena de texto
      let eqDerStr = eqDer.toString();
      let eqDere = math.derivative(eqDerStr, "x");
      let eqDerStr2 = eqDere.toString();

      console.log(eqDerStr2)
      console.log(eqDerStr)
      // Remplazamos X en nuestra Ecuacion normal
      let fxi = math.evaluate(funcion, { x: xi });

      // Remplazamos X en nuestra Ecuacion derivada
      let fdxi = math.evaluate(eqDerStr, { x: xi });

      // Calculamos recurrencia

      let iteracion = 1;
      let toll = 0;

      /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
      let recAnterior = 0;
      let xr = xi - fxi / fdxi;
      let fxr = math.evaluate(funcion, { x: xr });

      while (Math.abs(fxr) > tolerance) {
        resultados.push([
          iteracion,
          xi.toFixed(6),
          fxi.toFixed(6),
          fdxi.toFixed(6),
          xr.toFixed(6),
          toll.toFixed(6),
        ]); // guardamos los resultados

        
        xi = xr;

        recAnterior = xr; // actualizamos xrAnterior con el valor actual de xr

        fxi = math.evaluate(funcion, { x: xi });

        fdxi = math.evaluate(eqDerStr, { x: xi }); // Remplazamos X en nuestra Ecuacion derivada

        xr = xi - fxi / fdxi; // Calculando la recurrencia por cada iteracion
        fxr = math.evaluate(funcion, { x: xr });

        iteracion++;

        let diffXi = Math.abs(xr - recAnterior); // calculamos la diferencia entre xr actual y xr anterior
        toll = diffXi; // actualizamos la tolerancia con la diferencia de xr
      }
      resultados.push([
        iteracion,
        xi.toFixed(6),
        fxi.toFixed(6),
        fdxi.toFixed(6),
        xr.toFixed(6),
        toll.toFixed(6),
      ]); // guardamos el resultado final
      return resultados;
    }
  });
