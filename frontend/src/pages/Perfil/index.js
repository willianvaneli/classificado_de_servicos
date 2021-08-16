import React, {  useState, useEffect } from 'react';
import './styles.css';
import qs from 'qs';
import background from '../../assets/background_login.jpg'
import useAuth from '../../hooks/useAuth';
import { Link,Redirect, useHistory } from 'react-router-dom';
import SomeSpinner from '../../components/SomeSpinner';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import api from '../../services/api';
import Pagination from '../../components/Pagination';

const LIMIT = 3;

export default function Login(){
    const [offset, setOffset] = useState(0);

    const [totalAnuncios, setTotalAnuncios] = useState(0);

    const [anuncios, setAnuncios] = useState([]);
    const { user,signed, loading } = useAuth();
    const history = useHistory();
    useEffect(() => {

        const query = {
            page: {
              limit: LIMIT,
              offset
            }
          };

        api.get(`http://localhost:3333/perfil?${qs.stringify(query)}`,{
            headers:{
                anunciante_id: user.id,
            }
        }).then(response => {
            setAnuncios(response.data.anuncios);
            setTotalAnuncios(response.data.count);
        })
    }, [offset]);



    async function handleDeleteAnuncio(id) {
        try{
            await api.delete(`http://localhost:3333/anuncios/${id}`,{
                headers:{
                    anunciante_id: user.id,
                }
            });

            setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
        }catch(err){
            alert('Erro ao deletar o anúncio, tente novamente');
        }
        
    };

    function handleEdit(id){
        history.push(`/perfil/anuncios/${id}`);
    }

    if (loading) {
        return (
            <SomeSpinner/>
        )    
    }


    return (
        <div>
            {!signed ? (<Redirect to='./login'/>) :(
                <div >
                    <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
                    
                    <div className="perfil-container">
                        <div className="cabecalho">
                            <h5>Anúncios</h5>
                            <Link to="/perfil/anuncios"  className="button" >Cadastrar novo anúncio</Link>
                        </div>
                    
                        <section >
                            <ul>
                                {anuncios.map(anuncio =>(
                                    <li key={anuncio.id}>
                                            <img src={exemploAnuncio} alt="Anuncio exemplo"/>
                                        
                                            <div className="atributos">
                                                <strong>Categoria</strong>
                                                <p>{anuncio.categoria}</p>

                                                <strong>Valor</strong>
                                                <p>{ (anuncio.valor!==null) ? Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(anuncio.valor) :'0,00' }</p>

                                                <strong>Descrição</strong>
                                                <p>{anuncio.descricao}</p>

                                        </div>

                                        <div className="botoes">
                                            <button  onClick={() => handleEdit(anuncio.id)} type="button">
                                                <FiEdit size={20} color="#a8a8b3" />
                                            </button>

                                            <button  onClick={() => handleDeleteAnuncio(anuncio.id)} type="button">
                                                <FiTrash2 size={20} color="#a8a8b3" />
                                            </button>
                                        </div>
                                        
                                        
                                    </li>
                                ))}

                            </ul>
                            
                            {anuncios && (
                        <Pagination
                        limit={LIMIT}
                        total={totalAnuncios}
                        offset={offset}
                        setOffset={setOffset}
                        />
                    )}
                                
                            
                        </section>
                    </div>
                    
                    
                        
                    
                </div>
            )}
        </div>
        
        

    );
}

