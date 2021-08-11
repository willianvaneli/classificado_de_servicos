import React, { useCallback, useState, useEffect } from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg'
import useAuth from '../../hooks/useAuth';
import { Link,Redirect, useHistory } from 'react-router-dom';
import SomeSpinner from '../../components/SomeSpinner';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';


export default function Login(){
    const [anuncios, setAnuncios] = useState([]);
    const { user,signed, signOut, loading } = useAuth();
    const history = useHistory();
    useEffect(() => {
        api.get('http://localhost:3333/perfil',{
            headers:{
                anunciante_id: user.id,
            }
        }).then(response => {
            
            setAnuncios(response.data);
        })
    }, []);



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

                                        <button onClick={() => handleDeleteAnuncio(anuncio.id)} type="button">
                                            <FiTrash2 size={20} color="#a8a8b3" />
                                        </button>
                                        
                                    </li>
                                ))}

                            </ul>
                            
                                
                                
                            
                        </section>
                    </div>
                    
                    
                        
                    
                </div>
            )}
        </div>
        
        

    );
}

