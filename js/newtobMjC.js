document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtén los valores ingresados por el usuario
  var valor1 = parseInt(document.getElementById("valor1").value);
  var valor2 = parseInt(document.getElementById("valor2").value);
  const equation = document.getElementById("equation").value;
  const tolerance = parseFloat(document.getElementById("tolerance").value);

  // Verifica si valor1 es menor o mayor que valor2 para determinar el rango
  metodoNewtonMejorado(valor1, valor2, equation, tolerance);
});

//*
//*
//*

function metodoNewtonMejorado(Cons1, Cons2, funcion, toleran) {
  const Valores = rangoValores(Cons1, Cons2);
  let prevResult = Valores[0];
  let preIter = 0;

  for (let i = 0; i < Valores.length; i++) {
    // Variable primera que contendra el valor actual que va iterando el arreglo
    var currentResult = math.evaluate(funcion, { x: Valores[i] });

    if (Math.sign(prevResult) !== Math.sign(currentResult)) {
      const Fder1 = math.derivative(funcion, "x").toString();

      const Fder2 = math.derivative(Fder1, "x").toString();

      // Remplazamos X en nuestra funcion normal
      let fxi = math.evaluate(funcion, { x: Valores[i] });

      // Remplazamos X en nuestra Ecuacion derivada
      let fdx = math.evaluate(Fder1, { x: Valores[i] });

      // Remplazamos X en nuestra Ecuacion derivada por dos
      let fdxi = math.evaluate(Fder2, { x: Valores[i] });

      let ocur = Valores[i] - (fxi * fdx) / (Math.pow(fdx, 2) - fdx * fdxi);
      let i = 0;
      let tabla = document.createElement("table");

      while (Math.abs(fxi) > toleran) {
        let fila = document.createElement("tr");
        let celda1 = document.createElement("td");
        let celda2 = document.createElement("td");
        i++;
      }
      results.appendChild(tabla);
    }

    prevResult = currentResult;
    preIter = Valores[i];
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

//} else {
//   var miModal = new bootstrap.Modal(document.getElementById("miModal"));
//   miModal.show();
// }
