// Inicialização do SDK do Parse com suas Application ID e JavaScript Key fornecidos pelo Back4App
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';



document.getElementById('signup-button').addEventListener('click', function() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const userType = document.getElementById('signup-userType').value; // Corrigindo ID e adicionando a variável aqui
    const email = document.getElementById('signup-email').value; // Corrigindo ID e adicionando a variável aqui
    signUp(username, password, userType, email); // Passando userType como um parâmetro para a função signUp
});

// Alteração dos parâmetros da função signUp para incluir userType
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
