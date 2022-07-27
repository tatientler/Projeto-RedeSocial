import { useState } from 'react';
import { Link } from 'react-router-dom';
import encode from 'jwt-encode'
import { Navigate } from "react-router-dom";
import { Spin } from 'antd';

import './Login.css';
import logoInstagram from './img/logos/instagram.svg'
import logoFacebook from './img/logos/facebook.svg'
import logoGoogle from './img/logos/google.svg'
import logoLinkedIn from './img/logos/linkedin.svg'

export function Login({loginTransition = () => {}, transition = false, signUpTransition = () => {}}) {

    const secretId = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(16, '0');
    const secretToken = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(16, '0');

    const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState(false);
    const [emptyForm, setEmptyForm] = useState(true)

    function login(event) {
        event.preventDefault();
        const userEmail = event.target.email.value
        const userPassword = event.target.senha.value
        
        if(userEmail && userPassword) {

            setLoading(true)

            fetch('https://e2l89ma0ai.execute-api.us-east-1.amazonaws.com/dev/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
                }),
                credentials: "same-origin"
            })

            .then(async response => {
                const data = await response.json();
                const user = data.body;
                if(user.token) {
                    setIsLoggedIn(true)
                    setError(false)
                    const criptId = user.userID
                    const criptToken = user.token
                    const userProfile = user.profile
                    localStorage.setItem('token', criptToken)
                    localStorage.setItem('user', criptId)
                    localStorage.setItem('profile', userProfile)
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

    function signUp(event) {

        event.preventDefault();
        
        const userName = event.target.signUpName.value
        const userEmail = event.target.signUpEmail.value
        const userPassword = event.target.signUpPassword.value

        if(userName && userEmail && userPassword) {
                
                setLoading(true)

                fetch('https://e2l89ma0ai.execute-api.us-east-1.amazonaws.com/dev/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',                        
                    },
                    body: JSON.stringify({
                        name: userName,
                        email: userEmail,
                        password: userPassword
                    }),
                    credentials: "same-origin"
                })
                .then(async response => {
                    const data = await response.json()
                    const user = data.body
                    if(user.token){
                        setError(false)
                        const criptId = user.savedUser._id
                        const criptToken = user.token
                        const userProfile = user.savedProfile._id
                        localStorage.setItem('token', criptToken)
                        localStorage.setItem('user', criptId)
                        localStorage.setItem('profile', userProfile)
                        
                        setLoading(false)
                        setIsLoggedIn(true)
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
    
    return (
        <div className="login__page">
            <div className={`container ${transition ? 'right-panel-active' : ''}`} id="login__container">
                <div className="formulario-container criar-conta-container">
                    <form action="#" onSubmit={signUp}>
                        <h1>Criar conta</h1>
                        <div className="rede-social-container">
                            <Link to="/" className="rede-social"><img src={logoFacebook} alt="Logo Facebook que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoInstagram} alt="Logo Instagram que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoGoogle} alt="Logo Google que irá te direcionar para efetuar o login com a sua conta."/></Link>
                            <Link to="/" className="rede-social"><img src={logoLinkedIn} alt="Logo LinkedIn que irá te direcionar para efetuar o login com a sua conta."/></Link>
                        </div>
                        <span>ou use seu e-mail para se registrar</span>
                        <input onFocus={() => {setError(false)}} onClick={() => {setEmptyForm(true)}} type="text" placeholder="Nome" name="signUpName" />
                        <input onFocus={() => {setError(false)}} onClick={() => {setEmptyForm(true)}} type="email" placeholder="Email" name="signUpEmail" />
                        <input onFocus={() => {setError(false)}} onClick={() => {setEmptyForm(true)}} type="password" placeholder="Senha" name="signUpPassword" />
                        <button className={`entrar ${loading ? 'login-carregando' : '' }`} type="submit">{loading ? <Spin /> : 'Registrar'}</button>

                        {error && <span className="login__message">Email já cadastrado</span>}

                        {!emptyForm && <span className="login__message">Preencha todos os campos</span>}

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