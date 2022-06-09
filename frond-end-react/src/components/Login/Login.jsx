import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Navigate } from "react-router-dom";

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './Login.css';
import logoInstagram from './img/logos/instagram.svg'
import logoFacebook from './img/logos/facebook.svg'
import logoGoogle from './img/logos/google.svg'
import logoLinkedIn from './img/logos/linkedin.svg'

export function Login({loginTransition = () => {}, transition = false, signUpTransition = () => {}}) {

    const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState(false);
    const [emptyForm, setEmptyForm] = useState(true)

    function login(event) {
        event.preventDefault();
        const userEmail = event.target.email.value
        const userPassword = event.target.senha.value

        console.log(userEmail, userPassword)

        if(userEmail && userPassword) {

            setLoading(true)
                    
            fetch('http://localhost:3030/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer'
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
                }),
                credentials: "same-origin"
            })

            .then(response => response.json())
            .then(user => {
                console.log(user)
                if(user.token) {
                    setIsLoggedIn(true)
                    setError(false)
                    localStorage.setItem('token', user.token)
                    localStorage.setItem('user', user.userID)

                    return;
                }

                setError(true)
                setLoading(false)
            })
        }
        else {
            setEmptyForm(false)
        }
    }

    if(isLoggedIn && !error) {
        return <Navigate to="/feed" />
    }
    
    return (
        <div className="login__page">
            <div className={`container ${transition ? 'right-panel-active' : ''}`} id="login__container">
                <div className="formulario-container criar-conta-container">
                    <form action="#">
                        <h1>Criar conta</h1>
                        <div className="rede-social-container">
                            <Link to="/" className="rede-social"><img src={logoFacebook} alt="Logo Facebook que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoInstagram} alt="Logo Instagram que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoGoogle} alt="Logo Google que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoLinkedIn} alt="Logo LinkedIn que irá te direcionar para efetuar o login com a sua conta."/></Link>
                        </div>
                        <span>ou use seu e-mail para se registrar</span>
                        <input type="text" placeholder="Nome" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Senha" />
                        <button className="entrar" type="submit"><Link to="/feed">Entrar</Link></button>
                        <p>Já possui uma conta? <span onClick={() => signUpTransition(false)}><b>Faça login</b></span></p>

                    </form>
                </div>

                <div className="formulario-container entrar-container">
                    <form action="#" onSubmit={login}>
                        <h1>Entrar</h1>
                        
                        <div className="rede-social-container">
                            <Link to="/" className="rede-social"><img src={logoFacebook} alt="Logo Facebook que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoInstagram} alt="Logo Instagram que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoGoogle} alt="Logo Google que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoLinkedIn} alt="Logo LinkedIn que irá te direcionar para efetuar o login com a sua conta."/></Link>
                        </div>

                        <span>ou use uma conta cadastrada</span>

                        <input onFocus={() => {setError(false)}} onClick={() => {setEmptyForm(true)}} type="email" placeholder="Email" name="email"/>
                        <input onFocus={() => {setError(false)}} onClick={() => {setEmptyForm(true)}} type="password" placeholder="Senha" name="senha"/>

                        {error && <span className="login__message">Credenciais inválidas</span>}

                        {!emptyForm && <span className="login__message">Preencha todos os campos</span>}
                        <Link to="/">Esqueceu a senha?</Link>

                        <button className={`entrar ${loading ? 'login-carregando' : ''}`}>{loading ? <Spin /> : 'Entrar'}</button>

                        <p className="mobile">Ainda não possui login? <span href="#" onClick={() => loginTransition(true)}><b>Registrar</b></span></p>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bem-vindo de volta!</h1>
                            <p>Para se manter conectado, entre com o seu login.</p>
                            <button 
                            className="ghost" 
                            id="entrar"
                            onClick={() => loginTransition(false)}
                            >Entrar
                            </button>
                        </div>
                        
                        <div className="overlay-panel overlay-right">
                            <h1>Olá!</h1>
                            <p>Crie o seu login e inicie sua jornada conosco.</p>
                            <button 
                            className="ghost" 
                            id="registrar"
                            onClick={() => signUpTransition(true)}
                            >Registrar</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>© 2022 Copyright</p>
            </footer>
        </div>
    )
}