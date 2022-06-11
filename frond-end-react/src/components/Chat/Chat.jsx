import { useState } from 'react';

import './Chat.css';

import Arrow from './img/arrow-icon.svg';
import Send from './img/send-icon.svg';

export function Chat({openChat = () => {}, open, currentUserImage, friendUserImage}) {
    
    return (
        <div className={`chat ${open ? 'animate' : ''}`} data-anime-chat="top">

        <div className="chatBox">
            <h2 className="chat-titulo">Mensagens</h2>
            <button className="btnChat" onClick={ !open ? () => openChat(true) : () => openChat(false) }><i id="btnChat" className="msg-icone"><img src={Arrow} alt="ícone chat" /></i></button>
        </div>

        <div className="divChat">

            <div className="msg">
                <img className="msg-img" src={currentUserImage} alt="Avatar ou imagem do perfil do amigo" />
                <p>Oi. Como você está?</p>
                <span className="time-right">11:00</span>
            </div>
            
            <div className="msg friend">
                <img src={friendUserImage} alt="Avatar ou imagem do perfil do amigo" className="right" />
                <p>Hey! Eu estou bem. Obrigada por perguntar!</p>
                <span className="time-left">11:01</span>
            </div>
            
            <div className="msg">
                <img src={currentUserImage} alt="Avatar ou imagem do perfil do amigo" />
                <p>Legal! Então, o que você quer fazer hoje?</p>
                <span className="time-right">11:02</span>
            </div>
            
            <div className="msg friend">
                <img src={friendUserImage} alt="Avatar ou imagem do perfil do amigo" className="right" />
                <p>Ah, não sei. Jogar futebol.. ou talvez aprender mais sobre códigos?</p>
                <span className="time-left">11:05</span>
            </div>

            <div className="msg">
                <img src={currentUserImage} alt="Avatar ou imagem do perfil do amigo" />
                <p>Huumm.. pode ser. Qual linguagem você gostaria de aprender?</p>
                <span className="time-right">11:07</span>
             </div>
            
            <div className="msg friend">
                <img src={friendUserImage} alt="Avatar ou imagem do perfil do amigo" className="right" />
                <p>Por enquanto estou na parte de web.. acho que JS seria melhor!</p>
                <span className="time-left">11:10</span>
            </div>
            
            <div className="msg">
                <img src={currentUserImage} alt="Avatar ou imagem do perfil do amigo" />
                <p>Combinado. Nos vemos mais tarde!</p>
                <span className="time-right">11:13</span>
            </div>

             <div className="msg friend">
                <img src={friendUserImage} alt="Avatar ou imagem do perfil do amigo" className="right" />
                <p>Perfeito!</p>
                <span className="time-left">11:15</span>
            </div>

            <div className="msg">
                <img src={currentUserImage} alt="Avatar ou imagem do perfil do amigo" />
                <p>Aproveita e vai dando uma olhada nesses links: https://developer.mozilla.org/en-US/docs/Web/JavaScript<br/>https://www.w3schools.com/js/</p>
                <span className="time-right">11:18</span>
            </div>

            <div className="msg friend">
                <img src={friendUserImage} alt="Avatar ou imagem do perfil do amigo" className="right" />
                <p>Adorei.. vai me ajudar muito!</p>
                <span className="time-left">11:20</span>
            </div>

                <div className="novaMensagem"></div>
            </div>

            <div className="mensagem">
                <input type="text" name="mensagem" id="mensagem" placeholder="Mensagem..." />
                <button type="submit" id="btnMessagem"><i className="material-icons envio-icone"><img src={Send} alt="ícone enviar mensagem" /></i></button>
            </div>
        </div>

    )
}