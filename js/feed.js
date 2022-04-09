let btnChat = document.querySelector('.btnChat')
let chat = document.querySelector('.chat')
let iconChat = document.querySelector('#btnChat')

// Função que oculta chat
function collapseChat () {
    if(chat.classList.contains('animate') && iconChat.classList.contains('msg-icone-g')){
        chat.classList.remove('animate');
        iconChat.classList.remove('msg-icone-g');
        iconChat.classList.add('msg-icone')        
    } else{chat.classList.add('animate'); iconChat.classList.remove('msg-icone'); iconChat.classList.add('msg-icone-g')}
}
btnChat.addEventListener('click', collapseChat)