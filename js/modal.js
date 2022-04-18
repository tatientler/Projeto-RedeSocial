function iniciaModal(modalID){
    const modal = document.getElementById(modalID)
    modal.classList.add('mostrar')
}

let adicionarPost = document.querySelector('.adicionarPost')

adicionarPost.addEventListener('click', function(){
    iniciaModal('modal-post')
})

