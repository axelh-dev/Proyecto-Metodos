document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    // Obtén los valores ingresados por el usuario
    var valor1 = parseInt(document.getElementById('valor1').value);
    var valor2 = parseInt(document.getElementById('valor2').value);
  
    // Verifica si valor1 es menor o mayor que valor2 para determinar el rango
    var rango = [];
    if (valor1 < valor2) {
      for (var i = valor1; i <= valor2; i++) {
        rango.push(i);
      }
    } else {
      for (var i = valor1; i >= valor2; i--) {
        rango.push(i);
      }
    }
  
    // Imprime el rango en la consola
    console.log(rango);
  });
  