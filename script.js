let order = []
let clickedOrder = []
let score = 0
let ignoreClick = true

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

// Texto INICIAR
const centerText = document.querySelectorAll('.center-text')
// Botão no centro do jogo para iniciar
const btnCenter = document.querySelector('.center')

const reset = () => {
  order = []
  clickedOrder = []
  score = 0
  ignoreClick = true
}

// acende a cor
const lightColor = (element, number) => {  
  number = number * 500
  setTimeout(() => {
    element.classList.add('selected')
  }, number - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  }, number)
}

// cria ordem aletoria de cores
// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order.push(colorOrder)
  clickedOrder = []

  for(let i in order) {
    let elementColor = createColorElement(order[i])
    lightColor(elementColor, Number(i) + 1)
  }

  // Timeout para esperar o for loop terminar antes de habilitar o clique
  setTimeout(() => {
    ignoreClick = false
  }, order.length * 500)
}

// função para game over
const gameOver = () => {
  alert(`Você perdeu o jogo!\nPontuação: ${score -1}!`)
  reset()
}

// checa se os botões clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver()
      break
    }
  }
  if(clickedOrder.length == order.length) {
    if (score === 0) {
      centerText.forEach(text => text.innerHTML = `INICIAR`)  
    } else {
      centerText.forEach(text => text.innerHTML = `#${score}`)    
      nextLevel()
    }
  }
}

// função que retorna a cor
const createColorElement = (color) => {
  if(color == 0) {
    return green
  } else if(color == 1) {
    return red
  } else if (color == 2) {
    return yellow
  } else if (color == 3) {
    return blue
  }
}

// função para o clique do usuario
const click = (color) => {
  if (!ignoreClick) {
    clickedOrder.push(color)
    createColorElement(color).classList.add('selected')
  
    setTimeout(() => {
      createColorElement(color).classList.remove('selected')
      checkOrder()
    },250)
  }
}

// eventos de clique para as cores
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

// função para proximo nivel do jogo
const nextLevel = () => {
  ignoreClick = true
  score++
  // Espera meio segundo para começar acender as cores
  setTimeout(() => shuffleOrder(), 500)
}

// função de início do jogo
const playGame = () => {
  reset()
  nextLevel()
}

// inicio do jogo
btnCenter.addEventListener('click', () => {
  // Se tiver no meio do jogo o botão não vai funcionar
  score <= 1 && playGame()
})