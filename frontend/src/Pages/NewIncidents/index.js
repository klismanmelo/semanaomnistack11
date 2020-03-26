import React, {useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';
import "../../global.css";
import api from '../../services/api.js';

export default function NewIncidents(){
    const [title, setTitle] = useState('');
    const [desciption, setDesciption] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            desciption,
            value
        }
        try{
            await api.post('incidents', data, {
                headers: {
                    autorizo: ongId,
                }
            })

            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar Caso!')
        }
    }

    return(
        <div className="newincidents">
            <div className="container">
                <section>
                    <img src={logoImg} alt="Be The Heroes"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamentee para encotrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e=>(setTitle(e.target.value))}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={desciption}
                        onChange={e=>setDesciption(e.target.value)}
                    />

                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}