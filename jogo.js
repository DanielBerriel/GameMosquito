
var largura = 0 //Criação das variáveis globais Largura e Altura da página
var altura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search //armazenamos a url com referência do nível de dificuldade e com search recuperamos apenas o <?dificuldade>
nivel = nivel.replace('?', '')//utilizamos o replace para remover o caracter "?"

if(nivel === 'normal'){
	//1500 milissegundos
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
	//1000 milissegundos
	criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
	//750 milissegundos
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	//Lê e atribui as dimensões da página. Evento onresize.
	largura = window.innerWidth 
	altura = window.innerHeight

	console.log(largura, altura)
}
	
ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){

	tempo -= 1

	if(tempo < 0){
		clearInterval(cronometro) //através do clearInterval nós eliminamos as função da memória
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo //incluindo o valor dentro da tag html span
	} 
},1000)

function posicaoRandomica(){

	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')){ // true or null -> se o elemento existir entra no bloco, se não , o bloco é ignorado
		document.getElementById('mosquito').remove()

		if( vidas > 3) {
			
			window.location.href = 'fim_de_jogo.html'
		} else {
			//selecionando os pontos de vida e substituindo pelo coracao vazio
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"

			vidas++
		}
	}

	//gerando coordenadas aleatórias dentro das dimensões da página
	var posicaoX = Math.floor(Math.random() * largura) - 90 //-90 será usado para evitar que o msoquito seja cortado e abra um scroll
	var posicaoY = Math.floor(Math.random() * altura) -90

	posicaoX = posicaoX < 0 ? 0 : posicaoX //operador ternário, para evitar que o mosquito saia da página com valores posicionais negativos
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	//acessar o atributo src e atribuir o valor desejado
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		this.remove()
	}


	document.body.appendChild(mosquito)

}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3) //gerando valores : 0, 1 e 2
	

	switch(classe) {
		case 0:
			return 'mosquito1' //não necessita usar o break

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2) //gerando valores : 0, 1 
	

	switch(classe) {
		case 0:
			return 'ladoA' //não necessita usar o break

		case 1:
			return 'ladoB'

	}
}