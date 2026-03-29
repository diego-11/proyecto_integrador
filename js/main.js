document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    let nombre = document.getElementById('nombre').value;
    
    // Un mensaje simple de bienvenida como pide la guía
    alert("¡Hola " + nombre + "! Gracias por contactarnos para el proyecto SENA.");
});