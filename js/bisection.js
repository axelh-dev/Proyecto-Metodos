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
    console.log(resultados);

    // Definir la ecuacion a resolver utilizando math.js
    function biseccion(funcion, a, b, tolerance) {
      let resultados = [];
      let fa = math.evaluate(equation, { x: a });
      let fb = math.evaluate(equation, { x: b });
      if (fa * fb >= 0) {
        alert("La función no cambia de signo en el intervalo dado");
      } else {
        /* Calculamos la recurrencia */
        let xr = (a + b) / 2;
        /* Sustituimos recurrencia en nuestra ecuacion */
        let fxr = math.evaluate(funcion, { x: xr });
        let iteracion = 1;

        /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
        while (Math.abs(fxr) > tolerance) {
          resultados.push([iteracion, a, b, fa, fb, xr, fxr,toll]); // guardamos los resultados

          if (fa * fxr < 0) {
            b = xr;
            fb = fxr;
          } else {
            a = xr;
            fa = fxr;
          }

          var toll;
          /* Verificamos si hay iteraciones anteriones */  
          if (iteracion > 0) {
            var resultadoAnterior = resultados[iteracion - 1];
            toll = Math.abs((toll - resultadoAnterior));
          }
          xr = (a + b) / 2;
          fxr = math.evaluate(funcion, { x: xr });
          iteracion++;
        }
        resultados.push([iteracion, a, b, fa, fb, xr, fxr, toll]); // guardamos el resultado final
        return resultados;
      }
    }
  });
