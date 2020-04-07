import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import arrowLeft from '../../assets/arrow-left.svg';
import logo from '../../assets/logo.svg';

import './style.css';

import api from '../../services/api';

interface Ong {
  id?: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function HandleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newOng = {
      name,
      email,
      whatsapp: whatsApp,
      city: cidade,
      uf,
    };

    try {
      const response = await api.post<Ong>('ongs', newOng);
      alert(`Seu ID se acesso: ${response.data.id}`);
      history.push('/');
    } catch (Error) {
      alert('Erro no cadastro, tente novamente');
      console.error(Error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="logo Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            cassos da sua ONG.
          </p>
          <Link to="/" className="back-link">
            <img className="logInSvg" src={arrowLeft} alt="login" />
            Nao tenho cadastro
          </Link>
        </section>
        <form onSubmit={HandleRegister}>
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="Nome da ONG"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsApp}
            onChange={(event) => setWhatsApp(event.currentTarget.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={cidade}
              onChange={(event) => setCidade(event.currentTarget.value)}
            />
            <input
              style={{ width: 80 }}
              placeholder="UF"
              value={uf}
              onChange={(event) => setUf(event.currentTarget.value)}
            />
          </div>

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
