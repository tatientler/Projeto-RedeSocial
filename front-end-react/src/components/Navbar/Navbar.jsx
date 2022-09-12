import { useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

import logo from './img/logo.png'
import search from './img/search-icon.svg'
import notification from './img/notification-icon.svg'
import circle from './img/circle-icon.svg'
import group from './img/group-icon.svg'
import message from './img/message-icon.svg'

import calendar from './img/calendar-icon.svg'
import file from './img/file-code-icon.svg'
import bag from './img/shopping-bag-icon.svg'
import exit from './img/exit-icon.svg'

import './Navbar.css';
import { memo } from 'react';

function NavbarComponent() {

    const [open, setOpen] = useState(false)

        open ? document.body.classList.add('chat-extended') :  document.body.classList.remove('chat-extended')

    return (
        <>
        <header className="navbar container-fluid">

            <Link to="/feed" className="navbar__logo">
                <img className="logo" src={logo} alt="logo da Rede Social que é a sombra de um notebook branco e há tres círculos a sua volta." />
            </Link>

            <div className="mobile">

                <div className="navbar-expand-lg">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                    </label>

                    <ul className="menu__box">
                        <label className="menu__btn" htmlFor="menu__toggle">
                            <span></span>
                        </label>
                        <li><Link className="menu__item" to="/" />
                            <div className="barra-pesquisar menu">
                            <i className="search"><img src={search} alt="" /></i>
                            <input type="text" className="pesquisar" placeholder="Pesquisar" />
                            </div>
                        </li>

                        <li><Link className="menu__item" to="/" /><div className="d-flex align-items-center"><i className="bi bi-person-circle me-2"><img src={group} alt="" /></i> Perfil</div></li>

                        <li><Link className="menu__item" to="/" /><div className="d-flex align-items-center"><i className="bi bi-file-earmark-code-fill me-2"><img src={file} alt="" /></i> Códigos</div></li>

                        <li><Link className="menu__item" to="/" /><div className="d-flex align-items-center"><i className="bi bi-bag-check-fill me-2"><img src={bag} alt="" /></i> Market</div></li>

                        <li><Link className="menu__item" to="/" /><div className="d-flex align-items-center"><i className="bi bi-calendar-event me-2"><img src={calendar} alt="" /></i>Eventos</div></li>

                        <li><Link className="menu__item" to="/" /><div className="d-flex align-items-center"><i className="bi bi-box-arrow-left me-2"><img src={exit} alt="" /></i> Sair</div></li>
                    </ul>
                </div>
            </div>


            <div className="navbar-expand-lg">
                <div className="barra-pesquisar esconder">
                    <i className="search"><img src={search} alt="" /></i>
                    <input type="text" className="pesquisar" placeholder="Pesquisar" />
                </div>

                <div>
                    <button className="btnIcon"><i className="bi bi-bell-fill"></i><img src={notification} alt="" /><span className="qtdNotificacao">5</span></button>
                    <button className="btnHeader"><i className="bi bi-bell-fill"></i>Notificações <span className="qtdNotificacao">5</span></button>
                </div>

                <div>
                    <button className="btnIcon" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle-fill"><img src={circle} alt="" /></i></button>
                    <button className="btnHeader" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="bi bi-plus-circle-fill"></i>Publicar</button>
                </div>

                <div>
                    <button className="btnIcon"><i className="bi bi-people-fill"><img src={group} alt="" /></i><span className="qtdNotificacao">1</span></button>
                    <button className="btnHeader"><i className="bi bi-people-fill"></i>Amigos <span className="qtdNotificacao">1</span></button>
                </div>

                <div className="invisivel reduzido">
                    <button className="btnIcon" onClick={ !open ? () => {setOpen(true)} : () => {setOpen(false)} }><i className="bi bi-chat-square-dots-fill"><img src={message} alt="ícone mensagem" /></i></button>
                </div>
            </div>

            <div className="mobile">

                <div className="navbar-expand-lg">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                    </label>
                
                    <ul className="menu__box">
                        <label className="menu__btn" htmlFor="menu__toggle">
                            <span></span>
                        </label>
                        <li>
                            <div className="barra-pesquisar menu">
                            <i className="search"><img src={search} alt="" /></i>
                            <input type="text" className="pesquisar" placeholder="Pesquisar"/>
                            </div>
                        </li>

                        <li><div className="d-flex align-items-center"><i className="bi bi-person-circle me-2"></i> Perfil</div></li>

                        <li><div className="d-flex align-items-center"><i className="bi bi-file-earmark-code-fill me-2"></i> Códigos</div></li>

                        <li><div className="d-flex align-items-center"><i className="bi bi-bag-check-fill me-2"></i> Market</div></li>

                        <li><div className="d-flex align-items-center"><i className="bi bi-calendar-event me-2"></i>Eventos</div></li>

                        <li><Link className="menu__item" to ="/" /><div className="d-flex align-items-center"><i className="bi bi-box-arrow-left me-2"></i>Sair</div></li>
                    </ul>
                </div>
            </div>
    </header>
    </>
    )
}

export const Navbar = memo(NavbarComponent)