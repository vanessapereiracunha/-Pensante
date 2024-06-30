// Inicialização do Parse SDK
Parse.initialize("uICi8xqYEQ7dpHbf2rGjuKjMnyYnFLTJBCHg056J", "jqu44b1D0lMX47pRUz72PC3HL8CovkAja8kW2QxP");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Obtém o parâmetro questionarioId da URL
  const formRespostas = document.getElementById('form-respostas');
  const params = new URLSearchParams(location.search);
  const questionarioId = params.get('questionarioId');

  if (questionarioId) {
    fetchQuestionario(questionarioId);
  } else {
    alert("Questionário não encontrado.");
  }
 
  if (questionarioId) {
    // Se o questionarioId estiver presente, carrega o questionário
    fetchQuestionario(questionarioId);
  } else {
    // Caso contrário, exibe uma mensagem de erro
    alert("Questionário não encontrado.");
  }

  // Adiciona um evento de clique ao botão de enviar respostas
  document.getElementById('submit-respostas').addEventListener('click', submitRespostas);
});

// Função para buscar e exibir as perguntas do questionário
function fetchQuestionario(questionarioId) {
  const Pergunta = Parse.Object.extend('Pergunta');
  const query = new Parse.Query(Pergunta);
  query.equalTo("questionario", Parse.Object.createWithoutData("Questionario", questionarioId));
  query.find().then(perguntas => {
  const formRespostas = document.getElementById('form-respostas');
  formRespostas.innerHTML = 'Carregando perguntas...';
  const Pergunta = Parse.Object.extend('Pergunta');
  const query = new Parse.Query(Pergunta);
  query.equalTo("questionario", Parse.Object.createWithoutData("Questionario", questionarioId));
  
  query.find().then(perguntas => {
   
      if (perguntas.length === 0) {
        formRespostas.innerHTML = 'Este questionário não possui perguntas ativas no momento.';
        return;
      }
      console.log("Perguntas encontradas:", perguntas);
    // Obtém o formulário onde as perguntas serão adicionadas
    const formRespostas = document.getElementById('form-respostas');
    formRespostas.innerHTML = ''; // Limpa o formulário se já houver perguntas

    // Para cada pergunta, cria e adiciona elementos HTML ao formulário
    perguntas.forEach((pergunta, index) => {
      const perguntaElement = document.createElement('div');
      perguntaElement.className = 'pergunta';
      perguntaElement.id = 'pergunta-' + pergunta.id;

      const tituloPergunta = document.createElement('h3');
      tituloPergunta.textContent = `${index + 1}. ${pergunta.get('texto')}`;
      perguntaElement.appendChild(tituloPergunta);

      const opcoes = pergunta.get('opcoes');
      opcoes.forEach(opcao => {
        const inputId = `${pergunta.id}-${opcao}`;

        const inputElement = document.createElement('input');
        inputElement.type = 'radio';
        inputElement.name = pergunta.id;
        inputElement.value = opcao;
        inputElement.id = inputId;

        const labelElement = document.createElement('label');
        labelElement.htmlFor = inputId;
        labelElement.textContent = opcao;

        const divElement = document.createElement('div');
        divElement.appendChild(inputElement);
        divElement.appendChild(labelElement);

        perguntaElement.appendChild(divElement);
      });

      formRespostas.appendChild(perguntaElement);
    });
  }).catch(error => {
    console.error('Erro ao buscar perguntas:', error);
  });
}

// Função para enviar as respostas do questionário para o Parse
 function submitRespostas() {
  const formRespostas = document.getElementById('form-respostas');
  const respostaInputs = formRespostas.querySelectorAll('input[type="radio"]:checked');

  if (respostaInputs.length === 0) {
    alert('Por favor, responda a todas as perguntas antes de submeter.');
    return;
  };

  const respostas = Array.from(respostaInputs).map(input => {
    return {
      perguntaId: input.name,
      resposta: input.value
    };
  });

  const savePromises = respostas.map(({ perguntaId, resposta }) => {
    const Resposta = Parse.Object.extend('Respostas');
    const respostaObj = new Resposta();
    
    respostaObj.set('pergunta', Parse.Object.createWithoutData('Pergunta', perguntaId));
    respostaObj.set('resposta', resposta);
    respostaObj.set('usuario', Parse.User.current());

    return respostaObj.save();
  });

  Promise.all(savePromises).then(() => {
    alert('Respostas submetidas com sucesso!');
    // Aqui você pode redirecionar para outra página ou reiniciar o questionário
    window.location.href = 'pagina_de_sucesso.html'; // Exemplo de redirecionamento
  }).catch(error => {
    console.error('Erro ao enviar respostas:', error);
    alert('Houve um erro ao enviar suas respostas. Por favor, tente novamente.');
  });
}
    )}
  
