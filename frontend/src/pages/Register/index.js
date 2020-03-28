import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import "./styles.css";
import { FiArrowLeft } from 'react-icons/fi'

import Logo from "./../../assets/logo.svg"

import api from './../../services/api'
  
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState(''); 

    const history = useHistory();

    async function handleRegister(e) {
      // evitar reload da página
      e.preventDefault();

      try{
        const data = { name, email, whatsapp, city, uf}
        const response = await api.post('ongs', data)
        alert(`Seu id é: ${response.data.id}`)

        history.push('/')
      }catch(err){
        alert(`erro no seu cadastro: ${err}`)
      }
     
    }

    return (
      <div className="register-container">
          <div className="content">
              <section>
                <img src={Logo} alt="Logo Be the hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro e ajude pessoas a encontrarem casos da sua ONG</p>
                <Link to="/" className="back-link"> 
                  <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro
                </Link>
              </section>
              <form onSubmit={handleRegister}>
                <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} /> 
                <input type="email" placeholder="E-mail"  value={email} onChange={e => setEmail(e.target.value)}/>
                <input placeholder="whatsapp" value={whatsapp} onChange={e => setWhatsApp(e.target.value)}/>
                <div className="input-group">
                    <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                    <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)}/>
                </div>

                <button className="buttonLogIn">Cadastrar</button>
              </form>
          </div>
      </div>
    );
}