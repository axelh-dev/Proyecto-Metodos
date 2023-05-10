document
  .getElementById("muller-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const equation = document.getElementById("equation").value;
    const xo = parseFloat(document.getElementById("xo").value);
    const x1 = parseFloat(document.getElementById("x1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    /* Llamamos nuestro metodo y le pasamos los valores que vienen de los imputs */
    let resultados = muller(equation, xo, x1, x2, tolerance);

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
    function muller(funcion, x0, x1, x2, tolerance) {
      let resultados = [];

      // Funciones
      let fxo = math.evaluate(funcion, { x: x0 });
      let fx1 = math.evaluate(funcion, { x: x1 });
      let fx2 = math.evaluate(funcion, { x: x2 });

      /* Calculo de Las H*/
      let h0 = x1 - x0;
      let h1 = x2 - x1;

      /* Calculo de Las D*/
      let d0 = (fx1 - fxo) / (x1 - x0);

      let d1 = (fx2 - fx1) / (x2 - x1);

      /* Calculo de  A B C*/
      let a = (d1 - d0) / (h1 + h0);
      var b = h1 * a + d1;
      let c = fx2;

      /* Calculo de  x3*/
      if (b >= 0) {
        // let prmVal = -2 * c;
        // let sqrVal1 = Math.pow(b, 2);
        // let sqrVal2 = 4 * a + b;
        // let scnVal = Math.sqrt(sqrVal1 - sqrVal2);
        // let resVal = b + scnVal;

        // var x3 = x2 + prmVal / resVal;
        var x3 = x2 + (-2 * c) / (b + Math.sqrt(Math.pow(b, 2) - (4 * a + b)));
      } else {
        var x3 = x2 + (-2 * c) / (b - Math.sqrt(Math.pow(b, 2) - (4 * a + b)));
      }
      var error = Math.abs((x3 - x2) / x3);

      let iteracion = 1;
      while (error >= tolerance) {
        resultados.push([
          iteracion,
          xo.toFixed(6),
          x1.toFixed(6),
          x2.toFixed(6),
          fxo.toFixed(6),
          fx1.toFixed(6),
          fx2.toFixed(6),
          h0.toFixed(6),
          h1.toFixed(6),
          d0.toFixed(6),
          d1.toFixed(6),
          a.toFixed(6),
          b.toFixed(6),
          c.toFixed(6),
          x3.toFixed(6),
          error.toFixed(6),
        ]); 
        x0 = x1;
        x1 = x2;
        x2 = x3;
        // Funciones
        fxo = math.evaluate(funcion, { x: x0 });
        fx1 = math.evaluate(funcion, { x: x1 });
        fx2 = math.evaluate(funcion, { x: x2 });

        /* Calculo de Las H*/
        h0 = x1 - x0;
        h1 = x2 - x1;

        /* Calculo de Las D*/
        d0 = (fx1 - fxo) / (x1 - x0);

        d1 = (fx2 - fx1) / (x2 - x1);

        /* Calculo de  A B C*/
        a = (d1 - d0) / (h1 + h0);
        b = h1 * a + d1;
        c = fx2;

        /* Calculo de  x3*/
        if (b >= 0) {
          x3 = x2 + (-2 * c) / (b + Math.sqrt(Math.pow(b, 2) - (4 * a + b)));
        } else {
          x3 = x2 + (-2 * c) / (b - Math.sqrt(Math.pow(b, 2) - (4 * a + b)));
        }

        error = Math.abs((x3 - x2) / x3);

        iteracion++;      }
      resultados.push([
        iteracion,
        xo.toFixed(6),
        x1.toFixed(6),
        x2.toFixed(6),
        fxo.toFixed(6),
        fx1.toFixed(6),
        fx2.toFixed(6),
        h0.toFixed(6),
        h1.toFixed(6),
        d0.toFixed(6),
        d1.toFixed(6),
        a.toFixed(6),
        b.toFixed(6),
        c.toFixed(6),
        x3.toFixed(6),
        error.toFixed(6),
      ]); // guardamos el resultado final
      return resultados;
    }
  });
