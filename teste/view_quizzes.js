// Inicialização do SDK do Parse
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Quando o DOM estiver pronto, chama fetchQuestionnaires
document.addEventListener('DOMContentLoaded', function() {
    fetchQuestionnaires();
});

function fetchQuestionnaires() {
    const Questionario = Parse.Object.extend("Questionario");
    const query = new Parse.Query(Questionario);
    query.equalTo("ativo", true); // Filtra apenas questionários ativos
    query.find().then((results) => {
        // Limpa a lista existente
        const quizListDiv = document.getElementById('quiz-list');
        quizListDiv.innerHTML = '';

        // Itera sobre os questionários retornados e os adiciona à lista
        results.forEach((questionario) => {
            const quizDiv = document.createElement('div');
            quizDiv.className = 'quiz-entry';
            
            const quizTitle = document.createElement('h3');
            quizTitle.textContent = questionario.get('titulo');

            const takeQuizButton = document.createElement('button');
            takeQuizButton.textContent = 'Responder';
            
            // Defina um evento de clique para levar o aluno à página do questionário
            takeQuizButton.addEventListener('click', function() {
                window.location.href = `take_quiz.html?quizId=${questionario.id}`; // Direciona para a página de resposta do questionário
            });

            quizDiv.appendChild(quizTitle);
            quizDiv.appendChild(takeQuizButton);
            
            quizListDiv.appendChild(quizDiv);
        });
    }).catch((error) => {
        console.error('Erro ao buscar questionários:', error);
    });
}