import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import Nav from '../Nav';
import './styles.css';
import background from '../../assets/background_login.jpg'

export default function Login(){
    return (
        <div >
            <Nav/>
            <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
            <div className="login-container">
                <section className="form">
                    <form>
                        <h1>Faça seu Login</h1>
                        <input placeholder="Login" />
                        <input placeholder="Senha" />
                        <button className="button" type="submit">Entrar</button>
                        <a href="/cadastro"><FiLogIn size={18} color="black"/>
                        Não tenho cadastro</a>
                        
                    </form>
                </section>
            </div>
            
               
                
            
            <script src='../Nav/navbar'></script>
        </div>
        

    );
}

