import React, { useCallback } from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg';
import anuncianteService from '../../services/anunciante';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


export default function Cadastro(){

    const { signed  } = useAuth();

    async function handleCadastrar(){
        let nome = document.getElementById("nome").value;
        let email = document.getElementById("email").value;
        let razao_social = document.getElementById("razao_social").value;
        let telefone = document.getElementById("telefone").value;
        let cidade = document.getElementById("cidade").value;
        let estado = document.getElementById("estado").value;
        let senha = document.getElementById("senha").value;
        const data = {
            nome,
            email,
            razao_social,
            telefone,
            cidade,
            estado,
            senha
        };
        
        const response = await anuncianteService.cadastrar(data);
        console.log(response.success);
        if (response.success){
            <Redirect to='./home'/>
        }
    };


    return (
        <div>
            {signed ? (<Redirect to='./home'/>) :(
                <div >
                    <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
                    <div className="login-container">
                        <section className="form"  >
                            <form>
                                <h1>Faça seu cadastro</h1>
                                <input id="nome" name="nome" placeholder="Nome" required />
                                <input id="email" name="email" placeholder="Email" required />
                                <input id="razao_social" name="razao_social" placeholder="Razao Social" />
                                <input id="telefone" name="telefone" placeholder="Telefone" required/>
                                <input id="cidade" name="cidade" placeholder="Cidade" required/>
                                <input id="estado" name="estado" placeholder="Estado" required/>
                                <input type="password" id="senha" name="senha" placeholder="Senha" required/>
                                <button className="button" onClick={ handleCadastrar }>cadastrar</button>
                                
                            </form>
                        </section>
                    </div>
                </div>
            )}
        </div>

    );
}

