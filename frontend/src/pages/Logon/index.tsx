import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import logIn from '../../assets/log-in.svg';
import api from '../../services/api';

interface Login {
  id: string;
  name: string;
}

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await api.post<Login>('session', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (Error) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <img className="logInSvg" src={logIn} alt="log-in" />
            Nao tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
