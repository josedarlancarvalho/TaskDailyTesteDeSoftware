document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.text();
        document.getElementById('mensagemLogin').textContent = data;

        // Se o login for bem-sucedido, oculte os botões de registro e login
        if (response.ok) {
            document.getElementById('registroBtn').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
        }
    } catch (error) { 
        console.error('Erro ao fazer login:', error);
    }
});
