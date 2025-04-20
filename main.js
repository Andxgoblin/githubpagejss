// Recuperar usuarios guardados en localStorage
let userGuardado = JSON.parse(localStorage.getItem('Username')) || [];

// Validar el campo de correo
function validarUsuario() {
    const inputUser = document.getElementById('user').value.trim();
    const errorElement = document.getElementById('errorUser');

    // Regex para validar correo básico (ej: algo@dominio.com)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputUser === '' || inputUser.length < 3) {
        errorElement.innerHTML = 'El correo es obligatorio y debe tener al menos 3 caracteres.';
        errorElement.style.color = 'red';
        return false;
    } else if (!regexEmail.test(inputUser)) {
        errorElement.innerHTML = 'El correo debe incluir @ y un dominio válido (ej: usuario@dominio.com).';
        errorElement.style.color = 'red';
        return false;
    } else {
        errorElement.innerHTML = 'Correo correcto';
        errorElement.style.color = 'green';
        return true;
    }
}

// Validar el campo de contraseña
function validarContraseña() {
    const inputPass = document.getElementById('contraseña').value.trim();
    const errorElement = document.getElementById('errorPass');

    // Regex: 8+ caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (inputPass === '' || inputPass.length < 8) {
        errorElement.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
        errorElement.style.color = 'red';
        return false;
    } else if (!regex.test(inputPass)) {
        errorElement.innerHTML = 'Debe contener: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.';
        errorElement.style.color = 'red';
        return false;
    } else {
        errorElement.innerHTML = 'Contraseña válida';
        errorElement.style.color = 'green';
        return true;
    }
}

// Registrar un nuevo usuario
function registrarUsuario() {
    const usuario = document.getElementById('user').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    // Verificar si el usuario ya existe
    const usuarioExiste = userGuardado.some(user => user.usuario === usuario);

    if (usuarioExiste) {
        iniciarSesion(usuario, contraseña);
    } else {
        const informacion = { usuario, contraseña };
        userGuardado.push(informacion);
        localStorage.setItem('Username', JSON.stringify(userGuardado));
        localStorage.setItem('usuario', usuario); // Guardar el usuario actual para mostrarlo en la página de tareas
        alert('Usuario registrado exitosamente.');
        window.location.href = 'todolist.html'; // Redirigir a la página de tareas
    }
}

// Iniciar sesión con un usuario existente
function iniciarSesion(usuario, contraseña) {
    const usuarioValido = userGuardado.find(user => user.usuario === usuario && user.contraseña === contraseña);

    if (usuarioValido) {
        localStorage.setItem('usuario', usuario); // Guardar el usuario actual para mostrarlo en la página de tareas
        alert('Inicio de sesión exitoso.');
        window.location.href = 'todolist.html'; // Redirigir a la página de tareas
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Actualizar el texto del botón según el estado del usuario
function actualizarBoton() {
    const boton = document.getElementById('validar');
    const usuario = document.getElementById('user').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    // Verifica si el usuario existe Y si la contraseña coincide
    const usuarioExiste = userGuardado.some(user => user.usuario === usuario);

    boton.textContent = usuarioExiste ? 'Iniciar Sesión' : 'Registrarse';
}

// Evento principal para manejar el registro o inicio de sesión
document.getElementById('validar').addEventListener('click', (event) => {
    event.preventDefault();

    const usuarioValido = validarUsuario();
    const contraseñaValida = validarContraseña();

    if (usuarioValido && contraseñaValida) {
        const usuario = document.getElementById('user').value.trim();
        const contraseña = document.getElementById('contraseña').value.trim();
        registrarUsuario(usuario, contraseña);
    } else {
        alert('Por favor, complete los campos correctamente.');
    }
});

// Eventos para validar los campos en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user').addEventListener('input', validarUsuario);
    document.getElementById('contraseña').addEventListener('input', validarContraseña);
    document.getElementById('user').addEventListener('input', actualizarBoton);
    document.getElementById('contraseña').addEventListener('input', actualizarBoton);
});