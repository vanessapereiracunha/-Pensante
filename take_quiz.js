// Inicialização do SDK do Parse e funções para carregar, exibir perguntas e submeter respostas

document.getElementById('take-quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Implementar lógica de submissão de respostas
});
// Inicialização do SDK do Parse
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('take-quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const quizId = getQuizIdFromUrl(); // Função para obter o ID do questionário da URL
    const answers = collectAnswers();
    submitAnswers(quizId, answers);
});

// Função que busca as perguntas quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const quizId = getQuizIdFromUrl(); 
    fetchQuestionsForQuiz(quizId);
});

function getQuizIdFromUrl() {
    // Esta é uma função que você pode usar para recuperar o "quizId" da URL.
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('quizId');
}

function fetchQuestionsForQuiz(quizId) {
    const Questionario = Parse.Object.extend("Questionario");
    const query = new Parse.Query(Questionario);
    query.include('perguntas');
    query.get(quizId).then((questionario) => {
        // Assume-se que as perguntas estão relacionadas ao questionário.
        const perguntas = questionario.relation('Pergunta').query();
        return perguntas.find();
    }).then((perguntas) => {
        perguntas.forEach((pergunta) => {
            displayQuestion(pergunta);
        });
    }).catch((error) => {
        console.error('Error while fetching questions', error);
    });
}

function displayQuestion(pergunta) {
    const container = document.getElementById('take-quiz-form');

    const questionWrapper = document.createElement('div');
    questionWrapper.className = 'question';

    const questionLabel = document.createElement('label');
    questionLabel.textContent = pergunta.get('texto');
    questionWrapper.appendChild(questionLabel);

    // Este exemplo será para perguntas de tipo texto. Mudar isso se houver tipos diferentes.
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.name = pergunta.id;
    questionWrapper.appendChild(questionInput);

    container.appendChild(questionWrapper);
}

function collectAnswers() {
    const answers = [];
    const inputs = document.querySelectorAll('#take-quiz-form .question input');
    
    inputs.forEach(input => {
        answers.push({
            perguntaId: input.name,
            resposta: input.value
        });
    });
    
    return answers;
}

function submitAnswers(quizId, answers) {
    const Resposta = Parse.Object.extend('Resposta');
    const resposta = new Resposta();

    // Associa as respostas com o aluno atual e o questionário especificado
    resposta.set('questionario', { __type: 'Pointer', className: 'Questionario', objectId: quizId });
    resposta.set('respondidoPor', Parse.User.current());
    resposta.set('respostas', answers);

    resposta.save().then(() => {
        alert('Respostas submetidas com sucesso.');
        // Aqui você pode redirecionar o usuário ou limpar o formulário
    }).catch(error => {
        console.error('Erro ao submeter respostas: ', error);
        // Trate o erro apropriadamente, talvez mostrando uma mensagem ao usuário
    });
}

function fetchQuestionsForQuiz(quizId) {
    // Implementar lógica para buscar perguntas de um questionário específico
}

function submitAnswers(answers) {
    // Implementar lógica para submeter respostas
}