import React from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg';
import anuncianteService from '../../services/anunciante';
import { Redirect, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


export default function Cadastro(){
    //Usado para redirecionar para rotas
    const history = useHistory();

    const { signed  } = useAuth();

    async function handleCadastrar(e){
        //Previne a página de ser recarregada após o submit
        e.preventDefault();
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
        try {
            
            const response = await anuncianteService.cadastrar(data);
            console.log(response.success);
            alert('Cadastro realizado com sucesso');
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }
       
    };


    return (
        <div>
            {signed ? (<Redirect to='./home'/>) :(
                <div >
                    <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
                    <div className="login-container">
                        <section className="form"  >
                            <form onSubmit={handleCadastrar}>
                                <h1>Faça seu cadastro</h1>
                                <input id="nome" name="nome" placeholder="Nome" required />
                                <input type="email" id="email" name="email" placeholder="Email" required />
                                <input id="razao_social" name="razao_social" placeholder="Razao Social" />
                                <input id="telefone" name="telefone" placeholder="Telefone" required/>
                                <input id="cidade" name="cidade" placeholder="Cidade" required/>
                                <input id="estado" name="estado" placeholder="Estado" required/>
                                <input type="password" id="senha" name="senha" placeholder="Senha" required/>
                                <button className="button" type="submit">cadastrar</button>
                                
                            </form>
                        </section>
                    </div>
                </div>
            )}
        </div>

    );
}

