function revelarResposta() {
  var resposta = document.querySelector("#resposta"); // A função document.querySelector permite pegar elementos do HTML e tra\ê-los para o JS; faz a conexão entre JS e elemento HTML
  resposta.classList.toggle("embacar");
}

function proximaPergunta(proxPerg) {
  // Criação de uma função para mudar a pergunta ao clicarmos no botão "Próxima pergunta"
  var pergunta = document.querySelector("#pergunta"); // Atribuindo o elemento de id "pergunta" à variável de nome "pergunta", ou seja, agora essa variável corresponde ao elemento de id "pergunta"

  pergunta.innerHTML = ""; // Atualizando o conteúdo interno do elemento de id "pergunta" para uma string vazia, ou seja, apagando o todo o conteúdo para ele ser substituído futuramente

  var cardDiv = document.createElement("div"); // Criação de uma nova div que irá receber um novo card contendo outra pergunta

  cardDiv.classList.add("card", "animate__animated", "animate__bounceInRight"); // Atribuição da classe "card" à essa nova div. Essa classe já foi criada no HTML e irá atribuir à essa div todas as propriedades já criadas para a classe "card". 

  // As classes animate são relacionadas à animações CSS. After installing Animate.css, add the class animate__animated to an element, along with any of the animation names (don't forget the animate__ prefix!). Saiba mais em https://animate.style/#attention_seekers

  cardDiv.innerHTML = `<div class="card-cabecalho centralizar">
  <h2 class="card-termo">${proxPerg.title}</h2>
</div>
<div id="resposta" class="card-definicao embacar">
  <p>${proxPerg.description}</p>
</div>`; // Atualizando o conteúdo da div criada com as informações conseguidas através da função buscarInfos. As crases (``) servem para criarmos um template HTML. Para atribuir variáveis dentro desse template utilizamos ${}, sendo assim a única coisa que irá mudar é o que está entre as chaves.

  // .title e .description são valores do código do site de onde pegamos as informações

  pergunta.appendChild(cardDiv); // Anexando a div com o termo e resposta atualizados como filha do elemento de id "pergunta", atualizando a pergunta
}

function buscarInfos() {
  fetch("https://flash.quickstaart.com/random") // Busca a URL
    .then(function (resultado) {
      // Então (then) temos uma função para retornar o conteúdo encontrado na URL
      return resultado.json(); // Retorno do conteúdo em formato JSON. O json() é uma função responsável por "traduzir" o conteúdo para o formato JSON, o qual pode ser interpretado pelo JS
    })
    .then(function (resultadoJson) {
      proximaPergunta(resultadoJson); // A função proximaPergunta recebe como parâmetro resultadoJson, o qual exibe o conteúdo da URL seguindo as regras já ditadas na função proximaPergunta
    });
}

window.addEventListener("load", buscarInfos()); // Função que determina o que deverá ocorrer (addEventListener) quando a página é carregada ("load"). Nesse caso, executar a função buscarInfos, que exibe um termo aleatório assim que a página é carregada. Caso essa função não fosse adicionada, o primeiro card ao carregar a página não apareceria, pois o código (template HTML utilizado nesse documento) foi removido do documento .html para que, sempre que carregássemos a página, aparecesse um termo aleatório, e não sempre o mesmo termo. Caso quiséssemos que o mesmo termo aparecesse toda vez que carregássemos a página poderíamos reintegrar esse código ao documento HTML, sem problemas
