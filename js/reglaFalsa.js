document
  .getElementById("bisection-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const equation = document.getElementById("equation").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    /* Llamamos nuestro metodo y le pasamos los valores que vienen de los imputs */
    let resultados = biseccion(equation, a, b, tolerance);

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
    function biseccion(funcion, a, b, tolerance) {
      let resultados = [];
      let fa = math.evaluate(equation, { x: a });
      fa.toFixed(6);

      let fb = math.evaluate(equation, { x: b });
      fb.toFixed(6);

      if (fa * fb >= 0) {
        alert("La función no cambia de signo en el intervalo dado");
      } else {
        /* Calculamos la recurrencia */
        let xr = (a + b) / 2;
        xr.toFixed(6);

        /* Sustituimos recurrencia en nuestra ecuacion */
        let fxr = math.evaluate(funcion, { x: xr });
        fxr.toFixed(6);

        let iteracion = 1;
        let toll = 0;

        /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
        let xrAnterior = 0;
        while (Math.abs(fxr) > tolerance) {
          resultados.push([
            iteracion,
            a.toFixed(6),
            b.toFixed(6),
            fa.toFixed(6),
            fb.toFixed(6),
            xr.toFixed(6),
            fxr.toFixed(6),
            toll.toFixed(6),
          ]); // guardamos los resultados

          if (fa * fxr < 0) {
            b = xr;
            fb = fxr;
            fb.toFixed(6);
          } else {
            a = xr;
            fa = fxr;
            fa.toFixed(6);
          }

          xrAnterior = xr; // actualizamos xrAnterior con el valor actual de xr

          xr = (a + b) / 2;
          fxr = math.evaluate(funcion, { x: xr });
          fxr.toFixed(6);

          iteracion++;

          const diffXr = Math.abs(xr - xrAnterior); // calculamos la diferencia entre xr actual y xr anterior
          toll = diffXr; // actualizamos la tolerancia con la diferencia de xr
          toll.toFixed(6);
        }
        resultados.push([
          iteracion,
          a.toFixed(6),
          b.toFixed(6),
          fa.toFixed(6),
          fb.toFixed(6),
          xr.toFixed(6),
          fxr.toFixed(6),
          toll.toFixed(6),
        ]); // guardamos el resultado final
        return resultados;
      }
    }
  });
