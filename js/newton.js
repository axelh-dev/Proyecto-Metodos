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

      // Remplazamos X en nuestra Ecuacion normal
      let fxi = math.evaluate(funcion, { x: xi });

      // Remplazamos X en nuestra Ecuacion derivada
      let fdxi = math.evaluate(eqDerStr, { x: xi });

      // Calculamos recurrencia

      let iteracion = 1;
      let toll = 0;

      /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
      let recAnterior = 0;
      let recur = xi - fxi / fdxi;

      while (Math.abs(fxi) > tolerance) {
        if (iteracion > 10) {
          // lanzar excepción si el número máximo de iteraciones se alcanza
          alert("La iteración no converge");
          break;
        } else {
          resultados.push([
            iteracion,
            xi.toFixed(6),
            fxi.toFixed(6),
            fdxi.toFixed(6),
            recur.toFixed(6),
            toll.toFixed(6),
          ]); // guardamos los resultados
          xi = recur;

          recAnterior = xi; // actualizamos xrAnterior con el valor actual de xr

          recur = xi - fxi / fdxi; // Calculando la recurrencia por cada iteracion

          fxi = math.evaluate(funcion, { x: xi });

          fdxi = math.evaluate(eqDerStr, { x: xi }); // Remplazamos X en nuestra Ecuacion derivada

          iteracion++;

          let diffXi = Math.abs(xi - recur); // calculamos la diferencia entre xr actual y xr anterior
          toll = diffXi; // actualizamos la tolerancia con la diferencia de xr
        }
      }
      resultados.push([
        iteracion,
        xi.toFixed(6),
        fxi.toFixed(6),
        fdxi.toFixed(6),
        recur.toFixed(6),
        toll.toFixed(6),
      ]); // guardamos el resultado final
      return resultados;
    }
  });
