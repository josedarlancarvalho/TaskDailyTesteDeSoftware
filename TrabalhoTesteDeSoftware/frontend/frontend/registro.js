document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const data = await response.text();
        document.getElementById('mensagemRegistro').textContent = data;

        // Se o registro for bem-sucedido, oculte os botões de registro e login
        if (response.ok) {
            document.getElementById('registroBtn').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
    }
});
