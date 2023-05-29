function comprobarAdmin(){

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/comprobarAdmin.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.responseText.trim();
            if (response != 1) {
                window.location.href = './errorAdmin.html'
            }
        }
    };
    xhr.send();

}

function cargarListado(){

    // Hacer la solicitud al archivo PHP
    fetch('../php/listadoUsuarios.php')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
    // Manejar los datos recibidos
    if (data.length > 0) {
        // Obtener el contenedor del listado de usuarios
        const userList = document.getElementById('user-list');

        // Crear los registros de usuarios
        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');

            const userDetails = document.createElement('div');
            userDetails.classList.add('user-details');

            const userName = document.createElement('span');
            userName.classList.add('user-name');
            userName.textContent = user.usuario;

            const fieldDivider = document.createElement('span');
            fieldDivider.classList.add('field-divider');

            const userEmail = document.createElement('span');
            userEmail.classList.add('user-email');
            userEmail.textContent = user.correo;

            const userAdmin = document.createElement('span');
            userAdmin.classList.add('user-admin');
            userAdmin.textContent = user.admin == 1 ? 'Admin: Sí' : 'Admin: No';

            userDetails.appendChild(userName);
            userDetails.appendChild(fieldDivider);
            userDetails.appendChild(userEmail);

            const adminDivider = document.createElement('span');
            adminDivider.classList.add('field-divider');

            userDetails.appendChild(adminDivider);
            userDetails.appendChild(userAdmin);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario?');
                if (confirmar) {
                    // Eliminar el usuario del listado y de la base de datos
                    deleteUser(user.id); // Llamada a la función para eliminar el usuario
                    userList.removeChild(userDiv); // Eliminar el elemento del DOM
                }
            });

            userDiv.appendChild(userDetails);
            userDiv.appendChild(deleteButton);
            userList.appendChild(userDiv);
            });
        } else {
            console.log('No se encontraron usuarios.');
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });

        // Función para eliminar el usuario del listado y de la base de datos
        function deleteUser(userId) {
        // Realizar una solicitud al archivo PHP para eliminar el usuario de la base de datos
        fetch('../php/eliminarUsuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta de eliminación si es necesario
            console.log('Usuario eliminado:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }

}