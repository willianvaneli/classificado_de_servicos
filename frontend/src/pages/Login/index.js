import React, { useCallback } from 'react';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import background from '../../assets/background_login.jpg';
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import SomeSpinner from '../../components/SomeSpinner';


export default function Login(){

    const { signed, signIn, loading } = useAuth();

    const handleSignIn = useCallback( () => {
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        const data = {
            email,
            senha
        };
        signIn(data);
    }, [signIn]);

    if (loading) {
        return (
            <SomeSpinner/>
        )    
    }


    return (
        <div>
            {signed ? (<Redirect to='./home'/>) :(
                <div >
                    <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
                    <div className="login-container">
                        <section className="form" method="POST" action="./login">
                            <form>
                                <h1>Faça seu Login</h1>
                                <input id="email" name="email" placeholder="Email" />
                                <input id="senha" name="senha" type="password" placeholder="Senha" />
                                <button className="button" onClick={ handleSignIn }>Entrar</button>
                                <a href="/cadastro"><FiLogIn size={18} color="black"/>
                                Não tenho cadastro</a>
                                
                            </form>
                        </section>
                    </div>
                    
                    
                        
                    
                    <script src='../Nav/navbar'></script>
                </div>
            )}
        </div>
        
        

    );
}

