// Inicialização do SDK do Parse com suas Application ID e JavaScript Key fornecidos pelo Back4App
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.addEventListener('DOMContentLoaded', function() {
    // Todo o código relacionado ao DOM aqui

    document.getElementById('login-button').addEventListener('click', function() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        logIn(username, password);
    });

    document.getElementById('signup-button').addEventListener('click', function() {
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const userType = document.getElementById('signup-userType').value;
        signUp(username, password, userType);
    });
});

function logIn(username, password) {
    Parse.User.logIn(username, password).then(function(user) {
        // Login bem-sucedido
        alert('Login bem-sucedido!');
        const userType = user.get('type'); // Obtém o tipo de usuário do objeto do usuário
        // Redireciona para o menu correspondente
        if (userType === 'aluno') {
            window.location.href = 'menu_aluno.html';
        } else if (userType === 'professor') {
            window.location.href = 'menu_professor.html';
        } else {
            console.error('Tipo de usuário inválido:', userType);
            alert('Erro ao fazer login: Tipo de usuário inválido');
        }
    }).catch(function(error) {
        // Login falhou
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login: ' + error.message);
    });
}

function signUp(username, password, userType) {
    // Crie uma nova instância de usuário do Parse
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('type', userType);

    user.signUp().then(function(user) {
        // Cadastro bem-sucedido
        alert('Cadastro bem-sucedido!');
        // Após o cadastro, redirecione o usuário para a página de login
        window.location.href = 'login.html';
    }).catch(function(error) {
        // Cadastro falhou
        console.error('Erro ao fazer cadastro:', error);
        alert('Erro ao fazer cadastro: ' + error.message);
    });
}
