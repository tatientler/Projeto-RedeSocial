let publicar = document.getElementById('btnPublicar')
let btnClose = document.querySelector('.btn-close')
let input = document.getElementById('bodyModal')

publicar.addEventListener('click', addPost)
publicar.addEventListener('click', function() {
    btnClose.click()
    input.value = ''
})

function addPost(){

    let valor = input.value
    let nome = "John Doe"

    let post = document.getElementById('posts')

    let conteudo = document.createElement('div')
    conteudo.setAttribute('class', 'post1')

    conteudo.innerHTML = "<div class='author'><img src='./imagens/chester-wade-msnyz9L6gs4-unsplash.jpg' alt='Usuário logado'><p>" +
    nome + "</p></div><div class='contentPost1'><p>" + valor + "</p></div><div class='interacoes container'><button class='btnInt'><i class='material-icons icone-interacoes'>thumb_up</i>Reagir</button><button class='btnInt'><i class='material-icons icone-interacoes'>comment</i>Comentar</button><button class='btnInt'><i class='material-icons icone-interacoes'>send</i>Compartilhar</button></div><div class='btnInteracoes d-flex align-items-center'><button class='btnAction'><i class='material-icons icone-interacoes'>thumb_up</i></button><button class='btnAction'><i class='material-icons icone-interacoes'>comment</i></button><button class='btnAction'><i class='material-icons icone-interacoes'>send</i></button></div>"

    post.prepend(conteudo)

}
