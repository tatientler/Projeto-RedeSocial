let btnChat = document.querySelector('.btnChat')
let chat = document.querySelector('.chat')
let iconChat = document.querySelector('#btnChat')

let inputMensagem = document.querySelector('#mensagem')
let btnMessagem = document.querySelector('#btnMessagem')
let containerChat = document.querySelector('.novaMensagem')
let divChat = document.querySelector('.divChat')

// Função que oculta chat
function collapseChat () {
    divChat.scrollTop = divChat.scrollHeight * 100 // Para colocar o scroll no fim da div ao clicar em btnChat
    if(chat.classList.contains('animate') && iconChat.classList.contains('msg-icone-g')){
        chat.classList.remove('animate');
        iconChat.classList.remove('msg-icone-g');
        iconChat.classList.add('msg-icone')        
    } else{chat.classList.add('animate'); iconChat.classList.remove('msg-icone'); iconChat.classList.add('msg-icone-g')}
}
btnChat.addEventListener('click', collapseChat)

// Programação chat
let mensagens = {
        userName: 'John Doe',
        userMessages: []
    }

function exibirMensagens () {
    for (let i = 0; i < mensagens.userMessages.length; i++) {
        containerChat.innerHTML += `<div class="msg"> <img src="./imagens/chester-wade-msnyz9L6gs4-unsplash.jpg" alt="Avatar"> <p>${mensagens.userMessages[i]}</p> <span class="time-right">11:20</span> </div>`
        divChat.scrollTop = divChat.scrollHeight // Para colocar o scroll na última mensagem adicionada
    }
}

exibirMensagens()

function newMessage () {
    if(inputMensagem.value.match(/^(\s)+$/)) { // Para impedir envio de mensagens que contenham apenas espaço
        return false
    } else if (inputMensagem.value != "") {
        mensagens.userMessages.push(inputMensagem.value); // Para adicionar a nova mensagem ao array
        inputMensagem.value = ""; // Para limpar o input ao adicionar a mensagem ao array
        inputMensagem.focus() // Para manter o foco no input mesmo após o envio de uma mensagem
    } else {inputMensagem.value = ""}

    while(containerChat.firstChild) { // Para evitar clones do conteúdo do array ao enviar a mensagem
        containerChat.removeChild(containerChat.firstChild)
    }
    exibirMensagens()
}

inputMensagem.addEventListener('keypress', function(e) { // Para enviar mensagem com enter
    if(e.which == 13) {
        btnMessagem.click()
    }
})

btnMessagem.addEventListener('click', newMessage)

// Programação chat mobile

let btnChatMobile = document.querySelector('.bi-chat-square-dots-fill')

if(window.screen.width < 1024) { // Para adicionar "display: none" na div chat quando o tamanho da tela for menor que 1024.
    chat.style.display = 'none'
}

function exibirChatMobile () { // Função para exibir o chat mobile ao clicar no botão
    if(chat.style.display === 'none') {
        chat.style.display = 'inherit'
        divChat.scrollTop = divChat.scrollHeight * 100 // Para mostrar as últimas mensagens ao abrir o chat
    } else {chat.style.display = 'none'}
}

btnChatMobile.addEventListener('click', exibirChatMobile) // Evento que permite que o botão funcione