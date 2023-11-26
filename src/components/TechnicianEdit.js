import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TechnicianEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    address: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/technicians/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching technician details:', error);
      }
    };

    fetchTechnicianDetails();
  }, [id]);

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

      await axios.put(`http://localhost:3030/technicians/${id}`, formattedData);


      setSuccessMessage('Cadastro do técnico alterado com sucesso!');

      // limpa msg erro
      setError(null);



    } catch (error) {
      console.error('Error editing technician:', error);
      setError(error.response?.data?.message || 'Erro ao editar técnico.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Edição de cadastro:</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px', marginRight: '50px' }}>
          Name:
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
          Confirmar
        </button>
        <button onClick={handleCancel}
          type="button"
          style={{
            backgroundColor: '#B72808',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>

      </form>
      <Link to="/" style={{ display: 'block', marginTop: '20px', backgroundColor: '#01060C', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }}>
        Voltar para consulta
      </Link>
    </div>
  );
};

export default TechnicianEdit;
