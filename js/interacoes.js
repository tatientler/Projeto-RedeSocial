/* Teste para mostrar display de contagem com informações - formato desktop */ 
let reagir = document.getElementById('reagir')
let comentar = document.getElementById('comentar')
let compartilhar = document.getElementById('compartilhar')

reagir.addEventListener('click', curtir)
comentar.addEventListener('click', curtir)
compartilhar.addEventListener('click', curtir)

function curtir(){
        
    let mostrarDisplay = this.parentNode.previousElementSibling
    mostrarDisplay.setAttribute('class', 'reacoes ativar d-flex align-items-center')

    console.log(mostrarDisplay)
}

/* Teste para mostrar display de contagem com informações - formato mobile */ 
let reagir2 = document.getElementById('reagir-mobile')
let comentar2 = document.getElementById('comentar-mobile')
let compartilhar2 = document.getElementById('compartilhar-mobile')

reagir2.addEventListener('click', curtir2)
comentar2.addEventListener('click', curtir2)
compartilhar2.addEventListener('click', curtir2)

function curtir2(){

    let mostrarDisplay = this.parentNode.previousElementSibling.previousElementSibling
    mostrarDisplay.setAttribute('class', 'reacoes ativar d-flex align-items-center')

    console.log(mostrarDisplay)
}