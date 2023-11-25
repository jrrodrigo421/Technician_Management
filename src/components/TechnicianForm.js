
import React, { useState } from 'react';
import axios from 'axios';

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

    const formattedData = { ...formData, telephone: parseInt(formData.telephone, 10) };

    try {
      // Enviar os dados do formulário para a API (POST)
      const response = await axios.post('http://localhost:3030/technicians', formattedData);

      console.log('Técnico cadastrado com sucesso:', response.data);

      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        name: '',
        telephone: '',
        email: '',
        address: '',
      });
      setError(null);
    } catch (error) {
      console.error('Erro ao cadastrar técnico:', error);
      // Adicione tratamento de erro, se necessário
      if (error.response) {
        setError(error.response.data.message || 'Erro ao processar a solicitação.');
      } else {
        setError(error.message || 'Erro ao processar a solicitação.');
      }
    }
  };

  return (
    <div>
      <h1>Add Technician</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Telephone:
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default TechnicianForm;
