// Inicialização do SDK do Parse
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

let questionCount = 0; // Para manter o controle do número de perguntas adicionadas

function createQuiz(quizTitle, questionsData) {
    const Questionario = Parse.Object.extend("Questionario");
    const newQuiz = new Questionario();

    newQuiz.set("titulo", quizTitle);
    // Aqui você pode definir mais campos para o questionário, se necessário

    newQuiz.save().then((quiz) => {
        // Depois de salvar o questionário, salvar as perguntas e imagens associadas
        const savePromises = questionsData.map((questionData) => {
            if (questionData.imageFile) {
                // Primeiro precisa salvar a imagem no Parse
                const parseFile = new Parse.File(questionData.imageFile.name, questionData.imageFile);
                return parseFile.save().then((savedFile) => {
                    return createQuestionObject(quiz, questionData.questionText, questionData.options, savedFile);
                });
            } else {
                // Se não houver imagem, basta criar e salvar o objeto Pergunta
                return createQuestionObject(quiz, questionData.questionText, questionData.options);
            }
        });

        // Use Parse.Promise.when para lidar com múltiplas promessas e aguarde todas serem resolvidas
        return Parse.Promise.when(savePromises);
    }).then(() => {
        alert('Questionário criado com sucesso.');
        // Aqui você pode redirecionar o usuário ou limpar o formulário
        window.location.reload(); // Exemplo: Recarregar a página ou redirecionar
    }).catch((error) => {
        console.error('Erro ao criar o questionário: ', error);
        alert('Erro ao criar o questionário: ' + error.message);
    });
}

function createQuestionObject(quiz, questionText, options, imageFile = null) {
    const Pergunta = Parse.Object.extend("Pergunta");
    const newQuestion = new Pergunta();

    newQuestion.set("texto", questionText);
    newQuestion.set("opcoes", options);
    if (imageFile) {
        newQuestion.set("imagem", imageFile); // Salvar a imagem como um campo File
    }
    newQuestion.set("questionario", quiz); // Associar a pergunta ao questionário

    return newQuestion.save();
}