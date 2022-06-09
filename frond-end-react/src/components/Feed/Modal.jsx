import { useState } from 'react';

import close from './img/close-icon.svg'

import './Modal.css'

export function Modal({modal=false, modalClose = () => {}}) {

    return (
        <div className='modal__container'>
            <div className='modal__box'>
                <div className='modal__header'>
                    <h2>Criar publicação</h2>
                    <button onClick={() => {modalClose(false); document.body.classList.remove('modal-open')}}><img src={close} alt="" /></button>
                </div>
                <div className='modal__input'>
                    <input type="text" placeholder='No que está pensando?' />
                </div>
                <div className='modal__button'>
                    <button type='submit' onClick={(event) => {event.preventDefault()}}>Publicar</button>
                </div>

            </div>
        </div>
    )
}