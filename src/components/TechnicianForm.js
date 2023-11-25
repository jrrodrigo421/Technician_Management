import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = { ...formData, telephone: parseInt(formData.telephone, 10) };

      const response = await axios.post('http://localhost:3030/technicians', formattedData);

      console.log('Técnico cadastrado com sucesso:', response.data);

      setFormData({
        name: '',
        telephone: '',
        email: '',
        address: '',
      });

      setError(null);
    } catch (error) {
      console.error('Erro ao cadastrar técnico:', error);

      if (error.response) {
        setError(error.response.data.message || 'Erro ao processar a solicitação.');
      } else {
        setError(error.message || 'Erro ao processar a solicitação.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Cadastrar Técnico</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px', marginRight: '50px' }}>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Telefone:
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginLeft: '15px' }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Endereço:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ marginLeft: '5px' }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cadastrar
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <Link to="/" style={{ display: 'block', marginTop: '20px' }}>
        Voltar para a lista de técnicos
      </Link>
    </div>
  );
};

export default TechnicianForm;
