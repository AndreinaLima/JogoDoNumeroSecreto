let listaDeNumerosSorteados = []
let numeroLimite = 5000
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    verificarChute()
  }
})

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag)
  campo.innerHTML = texto
  responsiveVoice.speak(texto, "Brazilian Portuguese Female")
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Adivinhe o número secreto")
  exibirTextoNaTela("p", "Escolha um número entre 1 e 5000")
}

function verificarChute() {
  let chute = document.querySelector("input").value

  if (chute.length < 1) {
    exibirTextoNaTela("p", "Digite um número!")
    return
  }
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!")
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    exibirTextoNaTela("p", mensagemTentativas)
    document.getElementById("reiniciar").removeAttribute("disabled")

    let userRecord = localStorage.getItem("userRecord") || 0
    if (tentativas < userRecord || userRecord === 0) {
      userRecord = tentativas
      localStorage.setItem("userRecord", userRecord)
      document.getElementById("record").textContent = userRecord
      exibirTextoNaTela("p", `Novo recorde! ${userRecord} tentativas.`)
    }
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor")
    } else {
      exibirTextoNaTela("p", "O número secreto é maior")
    }
    tentativas++
    limparCampo()
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = []
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio()
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido)
    return numeroEscolhido
  }
}

function limparCampo() {
  chute = document.querySelector("input")
  chute.value = ""
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio()
  limparCampo()
  tentativas = 1
  exibirMensagemInicial()
  document.getElementById("reiniciar").setAttribute("disabled", true)
}

let userRecord = localStorage.getItem("userRecord") || 0
document.getElementById("record").textContent = userRecord
