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
        let toll = 0;
        
        /* creamos un ciclo que va a calcular cada iteracion y la va a guardar en un arreglo */
        let xrAnterior = 0;
        while (Math.abs(fxr) > tolerance) {
          resultados.push([iteracion, a, b, fa, fb, xr, fxr, toll]); // guardamos los resultados

          if (fa * fxr < 0) {
            b = xr;
            fb = fxr;
          } else {
            a = xr;
            fa = fxr;
          }

          xrAnterior = xr; // actualizamos xrAnterior con el valor actual de xr

          xr = (a + b) / 2;
          fxr = math.evaluate(funcion, { x: xr });
          iteracion++;

          const diffXr = Math.abs(xr - xrAnterior); // calculamos la diferencia entre xr actual y xr anterior
          toll = diffXr; // actualizamos la tolerancia con la diferencia de xr
        }
        resultados.push([iteracion, a, b, fa, fb, xr, fxr, toll]); // guardamos el resultado final
        return resultados;
      }
    }
  });
