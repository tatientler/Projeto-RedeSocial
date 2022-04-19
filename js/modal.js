let publicar = document.getElementById('btnPublicar')

publicar.addEventListener('click', addPost)

function addPost(){
    let input = document.getElementById('bodyModal')
    let valor = input.value
    let nome = "Nome usuário"

    let post = document.getElementById('posts')

    let teste = document.createElement('div')
    teste.setAttribute('class', 'post1')
    teste.innerHTML = "<div class='author'><img src='./imagens/img3.jpg' alt=''><p>" +
    nome + "</p></div><div class='contentPost1'><p>" + valor + "</p></div><div class='interacoes container'><button class='btnInt'><i class='material-icons icone-interacoes'>thumb_up</i>Reagir</button><button class='btnInt'><i class='material-icons icone-interacoes'>comment</i>Comentar</button><button class='btnInt'><i class='material-icons icone-interacoes'>send</i>Compartilhar</button></div><div class='btnInteracoes d-flex align-items-center'><button class='btnAction'><i class='material-icons icone-interacoes'>thumb_up</i></button><button class='btnAction'><i class='material-icons icone-interacoes'>comment</i></button><button class='btnAction'><i class='material-icons icone-interacoes'>send</i></button></div>"


    post.appendChild(teste)

    console.log(post)
}
