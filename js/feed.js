let btnChat = document.querySelector('.btnChat')
let animationDataChat = document.querySelector('[data-anime-chat]')
let chatContainer = document.querySelector('.container')
let chatBox = document.querySelector('.chatBox')
let chat = document.querySelector('.chat')
let iconChat = document.querySelector('#btnChat')

// Função que oculta chat
function collapseChat () {
    if(chatContainer.classList.contains('animate') && chatBox.classList.contains('animate') && iconChat.classList.contains('msg-icone-g')){
        chatContainer.classList.remove('animate');
        chatBox.classList.remove('animate');
        iconChat.classList.remove('msg-icone-g');
        iconChat.classList.add('msg-icone')        
    } else{chatContainer.classList.add('animate'); chatBox.classList.add('animate'); iconChat.classList.remove('msg-icone'); iconChat.classList.add('msg-icone-g')}
}
btnChat.addEventListener('click', collapseChat)