//formulario parte 1

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Limpiar mensajes de error
    document.getElementById('nombreError').textContent = '';
    document.getElementById('apellidosError').textContent = '';
    document.getElementById('telefonoError').textContent = '';
    document.getElementById('emailError').textContent = '';

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;

    // Validar nombre
    const nombreRegex = /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]{1,15}$/;
    if (!nombreRegex.test(nombre)) {
        document.getElementById('nombreError').textContent = 'Nombre inválido. Sólo letras, máximo 15 caracteres.';
        isValid = false;
    }

    // Validar apellidos
    const apellidosRegex = /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]{1,40}$/;
    if (!apellidosRegex.test(apellidos)) {
        document.getElementById('apellidosError').textContent = 'Apellidos inválidos. Sólo letras, máximo 40 caracteres.';
        isValid = false;
    }

    // Validar teléfono
    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(telefono)) {
        document.getElementById('telefonoError').textContent = 'Teléfono inválido. Deben ser 9 dígitos.';
        isValid = false;
    }

    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Correo electrónico inválido.';
        isValid = false;
    }

    // Si todo es válido, se puede enviar el formulario
    if (isValid) {
        alert('Formulario enviado correctamente.');
        // Aquí se podría enviar el formulario con:
        // this.submit();
    }
});

//formulario parte 2
document.addEventListener('DOMContentLoaded', function(){
    const productoSelect = document.getElementById('opciones');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
    const presupuestoinput = document.getElementById('presupuesto');
    const politicaCheckbox = document.getElementById('politica');
    const formularioUno = document.getElementById ('formulario');

    function calcularPresupuesto() {
        let total = parseFloat(productoSelect.value) || 0;
        let plazo = parseInt(plazoInput.value) || 1;
        
        // Sumar los extras seleccionados
        extrasCheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                total += parseFloat(checkbox.value);
            }
        });

        // Aplicar descuento basado en el plazo
        if (plazo > 12) {
            total *= 0.9; // 10% de descuento si el plazo es mayor a 12 meses
        }

        presupuestoinput.value = `$${total.toFixed(2)}`;
    }

    // Escuchar cambios en el formulario para recalcular el presupuesto
    productoSelect.addEventListener('change', calcularPresupuesto);
    plazoInput.addEventListener('input', calcularPresupuesto);
    extrasCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    // Validar el formulario antes de enviar
    formularioUno.addEventListener('submit', function(event) {
        if (!politicaCheckbox.checked) {
            alert('Debes aceptar las condiciones de privacidad.');
            event.preventDefault(); // Prevenir el envío si no se aceptan las condiciones
        }
    });

    // Calcular el presupuesto al cargar la página
    calcularPresupuesto();
});


