import { useState, useEffect } from 'react';
import decode from 'jwt-decode';

import close from './img/close-icon.svg'

import './Modal.css'

export function Modal({modal=false, modalClose = () => {}}) {

    const [emptyForm, setEmptyForm] = useState()
    
        const post = (event) => {
            event.preventDefault()
            const token = localStorage.getItem('token')
            const postContent = event.target.postContent.value
            console.log(postContent)

            if(postContent) {
                setEmptyForm(false)
                fetch("http://localhost:3030/post", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    user: localStorage.getItem('user')
                },
                body: JSON.stringify({
                    text: postContent,
                    user: localStorage.getItem('user')
            }),
                credentials: "same-origin"
            })
            .then(response => response.json())
            modalClose(false)
            }
            else {
                setEmptyForm(true)
            }
        }

    return (
        <div className='modal__container'>
            <div className='modal__box'>
                <div className='modal__header'>
                    <h2>Criar publicação</h2>
                    <button onClick={() => {modalClose(false); document.body.classList.remove('modal-open')}}><img src={close} alt="" /></button>
                </div>
                <form action="#" onSubmit={post}>
                <div className='modal__input'>
                    <input onClick={() => {setEmptyForm(false)}} name="postContent" type="text" placeholder='No que está pensando?' />
                </div>
                <div className='modal__button'>
                    {emptyForm && <p>Preencha o campo</p>}
                    <button type='submit'>Publicar</button>
                </div>
                </form>
            </div>
        </div>
    )
}