// Inicialização do SDK do Parse com suas Application ID e JavaScript Key fornecidos pelo Back4App
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('signup-button').addEventListener('click', async function() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.getElementById('signup-userType').value;
    const email = document.getElementById('signup-email').value;

    try {
        // Verifica se há um usuário logado e faz logout
        const currentUser = Parse.User.current();
        if (currentUser) {
            console.log('Usuário logado encontrado. Fazendo logout...');
            await Parse.User.logOut();
        }
        
        // Realiza o cadastro do novo usuário
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
    user.set("type", userType); // Definindo a propriedade "type" do usuário, nome do campo ajustado de "usertype" para "type"
    user.set("email", email); // Definindo a propriedade "type" do usuário, nome do campo ajustado de "usertype" para "type"

    // Movendo o redirecionamento para dentro do .then, após sucesso no cadastro
    user.signUp().then(function(user) {
        console.log('User signed up', user);
        // Redirecionar para a página correspondente após um cadastro bem-sucedido
        if(user.get("type") === "professor") {
            window.location.href = 'menu_professor.html'; // Modifique conforme necessário
        } else if(user.get("type") === "aluno") {
            window.location.href = 'menu_aluno.html'; // Modifique conforme necessário
        }
    }).catch(function(error) {
        console.error('Error while signing up user', error);
        alert('Erro ao registrar: ' + error.message);
    });
}
