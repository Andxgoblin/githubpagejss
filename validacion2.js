let tareaGuardada = JSON.parse(localStorage.getItem('tareas')) || [];

// Evento para agregar una nueva tarea
document.getElementById('validar').addEventListener('click', () => {
    let tarea = document.getElementById('tarea')?.value.trim();
    let fecha = document.getElementById('fecha')?.value.trim();

    // Limpiar mensajes de error previos
    document.getElementById('errorTarea').innerHTML = '';
    document.getElementById('errorFecha').innerHTML = '';

    let isValid = true;

    // Validar el campo Tarea
    if (!tarea || tarea.length < 3) {
        const errortext = 'La tarea es obligatoria y debe tener al menos 3 caracteres';
        document.getElementById('errorTarea').innerHTML = errortext;
        document.getElementById('errorTarea').style.color = 'red';
        isValid = false;
    }

    // Validar el campo Fecha
    if (!fecha) {
        const errortext = 'La fecha es obligatoria';
        document.getElementById('errorFecha').innerHTML = errortext;
        document.getElementById('errorFecha').style.color = 'red';
        isValid = false;
    }

    if (isValid) {
        let tareaValida = { tarea, fecha };
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>${tarea}</strong>
                <br>
                <small class="text-muted">Fecha: ${fecha}</small>
            </span>
            <div class="contenedor">
                <button class="btn btn-success btn-sm me-2" onclick="completarTarea(this)">Completar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        `;

        // Agregar la tarea al DOM
        document.getElementById('tareasPendientes').appendChild(li);

        // Limpiar los campos de entrada
        document.getElementById('tarea').value = '';
        document.getElementById('fecha').value = '';

        // Guardar la tarea en localStorage
        tareaGuardada.push(tareaValida);
        localStorage.setItem('tareas', JSON.stringify(tareaGuardada));

        // Agregar evento al botón "Eliminar"
        li.querySelector('.btn-danger').addEventListener('click', () => {
            // Eliminar del DOM
            li.remove();

            // Eliminar del localStorage
            tareaGuardada = tareaGuardada.filter(item => item.tarea !== tarea);
            localStorage.setItem('tareas', JSON.stringify(tareaGuardada));
        });
    }
});

// Cargar tareas pendientes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    tareaGuardada.forEach(tareaValida => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>${tareaValida.tarea}</strong>
                <br>
                <small class="text-muted">Fecha: ${tareaValida.fecha}</small>
            </span>
            <div class="contenedor">
                <button class="btn btn-success btn-sm me-2" onclick="completarTarea(this)">Completar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        `;

        document.getElementById('tareasPendientes').appendChild(li);

        // Agregar evento al botón "Eliminar"
        li.querySelector('.btn-danger').addEventListener('click', () => {
            // Eliminar del DOM
            li.remove();

            // Eliminar del localStorage
            tareaGuardada = tareaGuardada.filter(item => item.tarea !== tareaValida.tarea);
            localStorage.setItem('tareas', JSON.stringify(tareaGuardada));
        });
    });

    // Mostrar el usuario en el navbar
    const usuarioNavbar = document.getElementById('usuario-navbar');
    const savedUsuario = localStorage.getItem('usuario');
    if (savedUsuario) {
        usuarioNavbar.textContent = savedUsuario;
    } else {
        usuarioNavbar.textContent = 'Usuario';
    }

    // Configuración de estilos
    const configIcon = document.getElementById('config-icon');
    const configModal = document.getElementById('configModal');
    const closeConfig = document.getElementById('closeConfig');
    const applyConfig = document.getElementById('applyConfig');
    const resetConfig = document.getElementById('resetConfig');

    // Mostrar el modal de configuración
    configIcon.addEventListener('click', () => {
        configModal.style.display = 'block';
    });

    // Cerrar el modal de configuración
    closeConfig.addEventListener('click', () => {
        configModal.style.display = 'none';
    });

    // Aplicar configuraciones
    applyConfig.addEventListener('click', () => {
        const bgColor = document.getElementById('bgColor').value;
        const fontFamily = document.getElementById('fontFamily').value;
        const fontSize = document.getElementById('fontSize').value;

        if (bgColor) document.body.style.backgroundColor = bgColor;
        if (fontFamily) document.body.style.fontFamily = fontFamily;
        if (fontSize) document.body.style.fontSize = `${fontSize}px`;

        localStorage.setItem('backgroundColor', bgColor || '');
        localStorage.setItem('fontFamily', fontFamily || '');
        localStorage.setItem('fontSize', fontSize || '');

        configModal.style.display = 'none';
    });

    // Restablecer configuraciones
    resetConfig.addEventListener('click', () => {
        document.body.style.backgroundColor = '';
        document.body.style.fontFamily = '';
        document.body.style.fontSize = '';

        localStorage.removeItem('backgroundColor');
        localStorage.removeItem('fontFamily');
        localStorage.removeItem('fontSize');
    });

    // Aplicar configuraciones guardadas al cargar la página
    const savedColor = localStorage.getItem('backgroundColor');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedColor) document.body.style.backgroundColor = savedColor;
    if (savedFontFamily) document.body.style.fontFamily = savedFontFamily;
    if (savedFontSize) document.body.style.fontSize = `${savedFontSize}px`;
});

// Función para completar una tarea (tachar)
function completarTarea(button) {
    let li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    span.classList.toggle('text-decoration-line-through');
}