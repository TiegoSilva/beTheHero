import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import "./styles.css";
import { FiLogIn } from 'react-icons/fi'

import HeroesImage from "./../../assets/heroes.png"
import Logo from "./../../assets/logo.svg"

import api from './../../services/api'


function Logon() {
    const [id, setId] = useState('')

    const history = useHistory() 

    async function handleForm(e) {
      e.preventDefault();
      
      try{
        const data = { id }
        const response = await api.post('session', data); 

        localStorage.setItem('ong_id', response.data.id)
        localStorage.setItem('ong_name', response.data.name)

        history.push('/profile')
        
      }catch(err){
        alert(`we got some error ${err}`)
      }
    }

    return (
      <div className="logon-container">
          <section className="form">
            <img src={Logo} alt="Logo Be the hero"/>
            <form onSubmit={handleForm}>
                <h1>Faça seu logon</h1>
                <input placeholder="Seu id" onChange={e => setId(e.target.value)} />
                <button className="buttonLogIn">Entrar</button>

                <Link to="/register" className="back-link"> 
                  <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
                </Link>
            </form>

          </section>
          <img src={HeroesImage} alt="Heroes"/>
      </div>
    );
}
  
export default Logon