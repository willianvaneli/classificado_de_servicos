import React,{ useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { Slider } from '@material-ui/core';
import qs from 'qs';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import exemploAnuncio from '../../assets/anuncio_exemplo.png';

const LIMIT = 6;
export default function Home(){
    const history = useHistory();
    const [categoria, setCategoria ] = useState('');
    const [minValor, setMinValor] = React.useState(0);
    const [maxValor, setMaxValor] = React.useState(200);
    const [valor, setValor] = React.useState([0,200]);

    const [offset, setOffset] = useState(0);
    const [totalAnuncios, setTotalAnuncios] = useState(0);
    const [anuncios, setAnuncios] = useState([]);
    useEffect(() => {

        const query = {
            filtros: {
              categoria: categoria,
              valor: valor
            },
            page: {
                limit: LIMIT,
                offset
              }
        };

        api.get(`http://localhost:3333/home?${qs.stringify(query)}`,{
        }).then(response => {
            setAnuncios(response.data.anuncios);
            setTotalAnuncios(response.data.count);
            setMaxValor(response.data.max + 50);
        })
    }, [categoria,valor,offset]);

    const handleChangeSlider = (event, newValor) => {
        setValor(newValor);
    };

    const handleChangeCategoria = (event, newValor) => {
        setCategoria(event.target.value);
    };

    function handleShow(id){
        history.push(`/anuncios/show/${id}`);
    }
    
    return (
        <div className="home">
            <div className="controles">
                <strong>Categoria</strong>
                <select className="select" id="categoria" name="categoria" data-testid="categoria"
                onChange={handleChangeCategoria} >
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
                <div className="valor">
                    <strong >Valor</strong>
                    <div className="slider-content" data-testid="slider-content">
                    <strong>{valor[0]}</strong>
                    <Slider className="slider"
                        value={valor}
                        onChange={handleChangeSlider}
                        aria-labelledby="range-slider"
                        min = {minValor}
                        max = {maxValor}
                        
                    />
                    <strong>{valor[1]}</strong>
                    </div>
                </div>
            </div>
            <section className="container-anuncios">
                <ul className="linha">
                    {anuncios.map(anuncio =>(
                        <li key={anuncio.id} className="itens" onClick={() => handleShow(anuncio.id)}>
                            <img src={exemploAnuncio} alt="Anuncio exemplo"/>
                        
                            <div className="atributos">
                                <p>{ (anuncio.valor!==null) ? Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(anuncio.valor) :'0,00' }</p>
                                <p>{anuncio.categoria}</p>
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
        

    );
}

