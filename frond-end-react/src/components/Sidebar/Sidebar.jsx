import { useState, useEffect } from 'react';

import decode from 'jwt-decode';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import calendar from './img/calendar-icon.svg'
import circle from './img/circle-icon.svg'
import group from './img/group-icon.svg'
import box from './img/edit-box-icon.svg'
import file from './img/file-code-icon.svg'
import bag from './img/shopping-bag-icon.svg'
import exit from './img/exit-icon.svg'

import './Sidebar.css';

export function Sidebar({currentUserImage, currentUserName, modalOpen=() => {}}, modal) {

	const [user, setUser] = useState({});
    const location = useLocation();

	useEffect(() => {

        const userID = decode(localStorage.getItem('user'))

		fetch(`http://localhost:3030/users/${userID}`)
			.then(response => response.json())
			.then(data => {
                setUser(data)
			})
	}, [location.pathname]);

    return (
        <>
                <section className="secUser">

                    <div>
                        <img src={currentUserImage} alt="Perfil do usuário logado" />
                        <p>{user.name}</p>
                    </div>
                    
                    <div className="btnsUser">
                        <div className="user">
                            <Link to="" /><button className="btnIconUser"><i className="bi bi-pencil-square"><img src={box} alt="" /></i></button>
                            <Link to="" /><button className="btnUser">Perfil</button>
                        </div>

                        <div className="user">
                            <button className="btnIconUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {modalOpen(true); document.body.classList.add('modal-open')}}><i className="bi bi-plus-circle-fill"><img src={circle} alt="" /></i></button>
                            <button className="btnUser" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {modalOpen(true); document.body.classList.add('modal-open')}}>Publicar</button>
                        </div>

                        <div className="user">
                            <Link to="" /><button className="btnIconUser"><i className="bi bi-people-fill"><img src={group} alt="" /></i></button>
                            <Link to="" /><button className="btnUser">Amigos</button>
                        </div>

                        <div className="user">
                            <Link to="" /><button className="btnIconUser"><i className="bi bi-file-earmark-code-fill"><img src={file} alt="" /></i></button>
                            <Link to="" /><button className="btnUser">Códigos</button>
                        </div>

                        <div className="user">
                            <Link to="" /><button className="btnIconUser"><i className="bi bi-bag-check-fill"><img src={bag} alt="" /></i></button>
                            <Link to="" /><button className="btnUser">Market</button>
                        </div>

                        <div className="user">
                            <Link to="" /><button className="btnIconUser"><i className="bi bi-calendar-event"><img src={calendar} alt="" /></i></button>
                            <Link to="" /><button className="btnUser">Eventos</button>
                        </div>
                    </div>
                    
                    <div>
                        <Link to="/" /><button className="btn-exit btnIconExit"><i className="bi bi-box-arrow-left"><img src={exit} alt="" /></i></button>
                        <Link to="/" /><button className="btn-exit">Sair</button>
                    </div>
                </section>
        </>
    )
}