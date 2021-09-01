import React, { useState, useEffect} from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg';
import {  useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';
import api from '../../services/api';


export default function Edit(request){
    //Usado para redirecionar para rotas
    const history = useHistory();

    const { user  } = useAuth();
    const anuncio_id = request.match.params.id;
    const [categoria, setCategoria ] = useState('');
    const [valor, setValor ] = useState(0);
    const [descricao, setDescricao ] = useState('');
    
    useEffect(() => {
        api.get(`http://localhost:3333/anuncios/${anuncio_id}`,{
        }).then(response => {
            setCategoria(response.data.categoria);
            setValor(response.data.valor);
            setDescricao(response.data.descricao);
        })
    }, []);

    async function handleEdit(e){
        //Previne a página de ser recarregada após o submit
        e.preventDefault();
        const data = {
            anunciante_id: user.id,
            categoria,
            valor,
            descricao
        };
        try {
            await api.put(`http://localhost:3333/anuncios/${anuncio_id}`,{
                data
            });

            alert('Anúncio atualizado com sucesso');
            retornarPerfil();
        } catch (error) {
            alert('Erro ao atualizar anúncio, tente novamente');
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
                    <form onSubmit={handleEdit}>
                        <div className="atributos">
                            <img src={exemploAnuncio} alt="Anuncio exemplo"/>
                                                
                            <div >
                                <strong>Categoria</strong>
                                <select className="select"  
                                    value={categoria}
                                    onChange={ e => setCategoria(e.target.value)} required>
                                    <option value=""></option>
                                    <option value="auxiliar_servicos_gerais">Auxiliar de serviços gerais</option>
                                    <option value="baba">Babá</option>
                                    <option value="festas">Festas</option>
                                    <option value="encanador">Encanador</option>
                                    <option value="informatica">Informática</option>
                                    <option value="jardineiro">Jardineiro</option>
                                    <option value="marceneiro">Marceneiro</option>
                                    <option value="pedreiro">Pedreiro</option>
                                    <option value="pintor">Pintor</option>
                                    <option value="transporte">Transporte</option>
                                </select>

                                <strong>Valor</strong>
                                <input type="number"  min="0.0" step="0.01"   
                                value={valor}
                                onChange={ e => setValor(e.target.value)} required/>
                                

                                <strong>Descrição</strong>
                                <textarea   rows="4"  
                                value={descricao}
                                onChange={ e => setDescricao(e.target.value)}
                                required/>

                            </div>
                        </div>
                        <div className='botoes-edit-anuncio'>
                            <button className="confirmar" type="submit">Cadastrar</button>
                            <button className="cancelar" onClick={() => retornarPerfil()} >Cancelar</button>
                        </div>
                        
                    </form>
                </section>
            </div>
        </div>

    );
}

