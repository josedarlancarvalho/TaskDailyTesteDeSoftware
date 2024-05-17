const { Builder, By, Key, until } = require('selenium-webdriver');

// Defina o URL do formulário de registro
const urlRegistro = 'http://localhost:3000/registro.html';

// Função principal do teste
async function testeRegistro() {
    // Inicializa o WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navega até a página de registro
        await driver.get(urlRegistro);

        // Preenche o formulário de registro com dados de teste
        await driver.findElement(By.id('nome')).sendKeys('Nome de Teste');
        await driver.findElement(By.id('email')).sendKeys('caiosylva6@gmail.com');
        await driver.findElement(By.id('senha')).sendKeys('senha123');

        // Submete o formulário de registro
        await driver.findElement(By.id('submit-button')).click();

        // Aguarda até que a página de redirecionamento seja carregada
        await driver.wait(until.urlIs('http://localhost:3000/registro.html'), 5000);

        // Verifica se o usuário foi registrado com sucesso
        let urlAtual = await driver.getCurrentUrl();
        if (urlAtual === 'http://localhost:3000/registro.html') {
            console.log('Teste de registro bem-sucedido!');
        } else {
            console.error('O teste de registro falhou!');
        }
    } catch (error) {
        console.error('Erro durante o teste de registro:', error);
    } finally {
        // Fecha o navegador
        await driver.quit();
    }
}

// Chama a função principal do teste
testeRegistro();
