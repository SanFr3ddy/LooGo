document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aquí irá la lógica de autenticación
    console.log('Intento de inicio de sesión:', { email, password });
});

document.getElementById('registerLink').addEventListener('click', function(e) {
    e.preventDefault();
    // Aquí irá la redirección al registro
    console.log('Redirigiendo a registro...');
});