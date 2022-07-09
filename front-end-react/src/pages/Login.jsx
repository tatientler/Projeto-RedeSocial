import { useState } from 'react';

import { Login } from '../components/Login'

export function LoginPage() {
    const [loginTransition, setLoginTransition] = useState(false);

    return (
        <Login loginTransition={setLoginTransition} transition={loginTransition} signUpTransition={setLoginTransition}/>
    )
}