document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/registro.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });

        if (response.ok) {
            const data = await response.text();
            document.getElementById('mensagemRegistro').textContent = data;
            document.getElementById('mensagemRegistro').style.color = 'green';
        } else {
            const errorText = await response.text();
            document.getElementById('mensagemRegistro').textContent = errorText;
            document.getElementById('mensagemRegistro').style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
        document.getElementById('mensagemRegistro').textContent = 'Erro ao registrar. Por favor, tente novamente mais tarde.';
        document.getElementById('mensagemRegistro').style.color = 'red';
    }
});
