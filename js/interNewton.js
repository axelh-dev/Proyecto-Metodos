document
  .querySelector("Internewton-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtén los valores ingresados por el usuario
    var valor1 = parseInt(document.getElementById("valor1").value);
    var valor2 = parseInt(document.getElementById("valor2").value);
    const equation = document.getElementById("equation").value;
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    // Verifica si valor1 es menor o mayor que valor2 para determinar el rango
    metodoNewtonMejorado(valor1, valor2, equation, tolerance);
    // Imprime el rango en la consola
  });
function metodoNewtonMejorado(Cons1, Cons2, funcion, toleran) {
  const Valores = rangoValores(Cons1, Cons2);
  let prevResult = Valores[0];

  for (let i = 0; i <= Valores.length; i++) {
    // Variable primera que contendra el valor actual que va iterando el arreglo
    var currentResult = math.evaluate(funcion, { x: Valores[i] });

    if (Math.sign(prevResult) !== Math.sign(currentResult)) {
      console.log(funcion);

      currentResult = math.evaluate(funcion, { x: Valores[i] });

      console.log(currentResult);

      let Fder1 = math.derivative(funcion, "x");
      let fdx1 = Fder1.toString();

      let Fder2 = math.derivative(fdx1, "x").toString();

      // // Remplazamos X en nuestra funcion normal
      // let fxi = math.evaluate(ecuacion, { x: xi });

      // // Remplazamos X en nuestra Ecuacion derivada
      // let fdxi = math.evaluate(ecuacion, { x: xi });
    }

    prevResult = currentResult;
  }
}

function rangoValores(val1, val2) {
  var rango = [];
  if (val1 < val2) {
    for (var i = val1; i <= val2; i++) {
      rango.push(i);
    }
  } else {
    for (var i = val1; i >= val2; i--) {
      rango.push(i);
    }
  }
  return rango;
}
