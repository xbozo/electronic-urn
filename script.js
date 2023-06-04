let seuVotoPara = document.querySelector(".divisao-1-1 span")
let cargo = document.querySelector(".divisao-1-2 span") 
let numeros = document.querySelector(".divisao-1-3")
let descricao = document.querySelector(".divisao-1-4")
let aviso = document.querySelector(".divisao-2")
let lateral = document.querySelector(".divisao-1-right")

let etapaAtual = 0
let numero = ""
let votoBranco = false
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual]    // etapaAtual = 0 (posição do array de etapas que gera as info.)
    let numeroHtml = ""
    numero = ""
    votoBbranco = false

    for( let i=0; i < etapa.numeros; i++ ) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = "none"
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ""
    aviso.style.display = "none"
    lateral.innerHTML = ""
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter( (item) => {     // checa se existe um candidato com aquele numero
        if (item.numero === numero) { 
            return true
        } else {
            return false
        }
    })

    if(candidato.length > 0) {       // se achou algum candidato
        candidato = candidato[0]
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        
        let fotosHtml = ""
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="divisao-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="divisao-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml

    } else {
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}   

function clicou(n) {
    let elementNumero = document.querySelector(".numero.pisca")
    if(elementNumero !== null) {      // numero é diferente de null?
        elementNumero.innerHTML = n
        numero = `${numero}${n}`

        elementNumero.classList.remove("pisca")      // passa a classe pisca pro próximo campo
        if(elementNumero.nextElementSibling !== null) {      // verifica se há um próximo campo a ser preenchido pra adicionar o pisca
            elementNumero.nextElementSibling.classList.add("pisca")   // o next representa de fato o próximo elemento irmão
        } else {
            atualizaInterface()
        }
    }
}

function branco() {
    numero = ""     // limpa se já houver numeros digitados

    votoBranco = true
    seuVotoPara.style.display = "block"
    aviso.style.display = "block"
    numeros.innerHTML = ""
    lateral.innerHTML = ""
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "branco"
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector(".tela").innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()
