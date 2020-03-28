import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'



import "./styles.css";
import { FiPower, FiTrash2 } from 'react-icons/fi'

import Logo from "./../../assets/logo.svg"

import api from './../../services/api'
  
export default function Profile() {
    const history = useHistory()
    const [incidents, setIncidents] = useState([])
    const ong_name = localStorage.getItem('ong_name')
    const ong_id = localStorage.getItem('ong_id')

    useEffect(async() => {
        const data = { 
                headers: { 
                    Authorization: ong_id
                } 
            }
        const response = await api.get('list_incidents', data).then(response => {
                setIncidents(response.data)
            })
    }, [])

    async function handleTrash (id){ 
        try{
            const URLb = 'delete_incident/' + id;
            
            const headers = { 
                Authorization: ong_id
            }
            const response = await api.delete(URLb, { headers } );
            
            setIncidents(incidents.filter(incident => incident.id !== id ))
            
            alert("Item deletado")
        }catch(err){    
            alert("we got a error" + err)
        }
    }

    function handleLogOut(){
        localStorage.clear()
        history.push('/')
    }
    return (
      <div className="profile-container">
          <header>
              <img src={Logo} alt="Logo Be The Hero"/>
                <span>Bem-vinda {ong_name}</span>
                <Link class="buttonLogIn" to="/incidents/new"> Cadastrar novo caso </Link>
                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#E02041" /> 
                </button>
          </header>

          <h1>Casos Cadastrados</h1>
          <ul>
              {
                  incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>caso: </strong>
                        <p>{incident.title}</p>

                        <strong>descrição: </strong>
                        <p>{incident.description}</p>

                        <strong>valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: "BRL"}).format(incident.value)}</p>

                            <button type="button" onClick={ () => handleTrash(incident.id)}>
                                <FiTrash2 size={20} color="#dcdce6" />
                            </button>
                    </li>
                  ))
              }
              
          </ul>
      </div>
    );
}