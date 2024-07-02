// Inicialização do SDK do Parse com suas Application ID e JavaScript Key fornecidos pelo Back4App
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('signup-button').addEventListener('click', async function() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.getElementById('signup-userType').value;
    const email = document.getElementById('signup-email').value;

    try {
        await Parse.User.logOut();
        signUp(username, password, userType, email);
    } catch (error) {
        console.error('Error while logging out user', error);
        alert('Erro ao deslogar: ' + error.message);
    }
});

// Função de cadastro do usuário
function signUp(username, password, userType, email) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("type", userType);
    user.set("email", email);

    user.signUp().then(function(user) {
        console.log('User signed up', user);
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        // Redirecionar para a página correspondente após um cadastro bem-sucedido
        if(user.get("type") === "professor") {
            window.location.href = 'menu_professor.html';
        } else if(user.get("type") === "aluno") {
            window.location.href = 'menu_aluno.html';
        }
    }).catch(function(error) {
        console.error('Error while signing up user', error);
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
        alert('Erro ao registrar: ' + error.message);
    });
}
