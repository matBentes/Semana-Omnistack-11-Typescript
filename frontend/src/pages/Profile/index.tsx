import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo.svg';
import power from '../../assets/power.svg';
import trash2 from '../../assets/trash-2.svg';

import api from '../../services/api';

interface Incidents {
  value: number;
  description: string;
  id: number;
  title: string;
}

export default function Profile() {
  const [incidents, setIncidents] = useState<Incidents[]>([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('incidents', {
      headers: {
        Authorization: ongId,
      },
    }).then((response) => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id: number) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (Error) {
      alert('Erro ao deletar incidents');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logo} className="logo" alt="logo Be The Hero" />
        <span>
          Bem vinda,
          {' '}
          {ongName}
        </span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <img src={power} alt="power img" className="powerSvg" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso: </strong>
            <p>{incident.title}</p>

            <strong>Descricao: </strong>
            <p>{incident.description}</p>

            <strong>Valor </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button"><img src={trash2} className="trash2Svg" alt="icon trash" /></button>
          </li>
        ))}

      </ul>
    </div>
  );
}
