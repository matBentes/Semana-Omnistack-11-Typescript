import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import arrowLeft from '../../assets/arrow-left.svg';

import './style.css';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso');
    }
  }

  return (
    <div className="new-incident-container">

      <div className="content">
        <section>
          <img src={logo} alt="logo Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <img className="arrow-left" src={arrowLeft} alt="login" />
            Voltar para profile
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Titulo do caso"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descricao"
          />
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Valor em reais"
          />

          <button type="submit" className="button">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}
