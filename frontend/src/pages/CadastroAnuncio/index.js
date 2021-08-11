import React from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg';
import {  useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';
import api from '../../services/api';


export default function Cadastro(){
    //Usado para redirecionar para rotas
    const history = useHistory();

    const { user  } = useAuth();

    async function handleCadastrar(e){
        //Previne a página de ser recarregada após o submit
        e.preventDefault();
        let categoria = document.getElementById("categoria").value;
        let valor = document.getElementById("valor").value;
        let descricao = document.getElementById("descricao").value;
        const data = {
            anunciante_id: user.id,
            categoria,
            valor,
            descricao
        };
        try {
            const response = await api.post(`http://localhost:3333/anuncios/`,{
                data
            });

            alert('Anúncio cadastrado com sucesso');
            retornarPerfil();
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }
       
    };

    function retornarPerfil(){
        history.push('/perfil');
    }


    return (
        <div>
            <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
            <div className="container">
                <section className="form"  >
                    <form onSubmit={handleCadastrar}>
                        <div className="atributos">
                            <img src={exemploAnuncio} alt="Anuncio exemplo"/>
                                                
                            <div >
                                <strong>Categoria</strong>
                                <select className="select" id="categoria" name="categoria"  required>
                                    <option></option>
                                    <option>Auxiliar de serviços gerais</option>
                                </select>

                                <strong>Valor</strong>
                                <input type="number"  min="0.0" step="0.01" id="valor" name="valor"  required/>
                                

                                <strong>Descrição</strong>
                                <textarea id="descricao" name="descricao"  rows="4"  required/>

                            </div>
                        </div>
                        <div className="botoes">
                            <button className="confirmar" type="submit">Cadastrar</button>
                            <button className="cancelar" onClick={() => retornarPerfil()} >Cancelar</button>
                        </div>
                        
                        
                    </form>
                </section>
            </div>
        </div>

    );
}

