import React, { useState, useEffect} from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg';
import {  useHistory } from 'react-router-dom';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';
import api from '../../services/api';


export default function Edit(request){
    //Usado para redirecionar para rotas
    const history = useHistory();

    const anuncio_id = request.match.params.id;
    const [categoria, setCategoria ] = useState('');
    const [valor, setValor ] = useState(0);
    const [descricao, setDescricao ] = useState('');

    const [razao_social, setRazaoSocial ] = useState('');
    const [cidade, setCidade ] = useState('');
    const [estado, setEstado ] = useState('');
    const [telefone, setTelefone ] = useState('');
    const [nome, setNome ] = useState('');
    
    
    useEffect(() => {
        api.get(`http://localhost:3333/anuncios/show/${anuncio_id}`,{
        }).then(response => {
            setCategoria(response.data.anuncio.categoria);
            setValor(response.data.anuncio.valor);
            setDescricao(response.data.anuncio.descricao);
            setRazaoSocial(response.data.anunciante.razao_social);
            setCidade(response.data.anunciante.cidade);
            setEstado(response.data.anunciante.estado);
            setTelefone(response.data.anunciante.telefone);
            setNome(response.data.anunciante.nome);
        })
    }, []);

    

    return (
        <div>
            <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
            <div className="container">
                <section className="form"  >
                    <form >
                        <div className="atributos">
                            <img src={exemploAnuncio} alt="Anuncio exemplo"/>
                                                
                            <div >
                                <strong>Anunciante</strong>
                                <input value={nome} disabled/>
                                <strong>Razao Social</strong>
                                <input value={razao_social} disabled/>
                                <strong>Contato</strong>
                                <input value={telefone} disabled/>
                                <strong>Cidade</strong>
                                <input value={cidade} disabled/>
                                <strong>Estado</strong>
                                <input value={estado} disabled/>

                                <strong>Categoria</strong>
                                <select className="select"  
                                    value={categoria}
                                    disabled>
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
                                disabled/>
                                

                                <strong>Descrição</strong>
                                <textarea   rows="4"  
                                value={descricao}
                                disabled/>

                            </div>
                        </div>
                        
                    </form>
                </section>
            </div>
        </div>

    );
}

