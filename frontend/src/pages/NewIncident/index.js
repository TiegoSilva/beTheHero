import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'


import "./styles.css";
import { FiArrowLeft } from 'react-icons/fi'

import Logo from "./../../assets/logo.svg"

import api from './../../services/api'
  
export default function NewIncident() {
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ong_id = localStorage.getItem('ong_id')


    async function handleIncident(e){ 
      e.preventDefault();

      
      const data = { 
        title, 
        description, 
        value
      }

      try{
        const response = api.post('/incidents', data, { headers: { Authorization: ong_id } } )
        history.push('/profile')
      }catch(err){
        alert('we got some error')
      }
      
    }



    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
              <img src={Logo} alt="Logo Be the hero"/>
              <h1>Cadastro novo caso </h1>
              <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
              <Link to="/profile" className="back-link"> 
                <FiArrowLeft size={16} color="#E02041" /> Voltar para home
              </Link>
            </section>
            <form onSubmit={handleIncident}>
              <input placeholder="Titulo" value={title} onChange={ e => setTitle(e.target.value) }/> 
              <textarea placeholder="Descrição" value={description} onChange={ e => setDescription(e.target.value) } />
              <input placeholder="Valor em Reais" value={value} onChange={ e => setValue(e.target.value) } />

              <button className="buttonLogIn">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}