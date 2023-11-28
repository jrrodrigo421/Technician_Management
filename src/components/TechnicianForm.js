import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';


import 'react-toastify/dist/ReactToastify.css';

import './TechnicianForm.css'
import { toast, ToastContainer } from 'react-toastify';

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    address: '',
  });
  const telephoneInputRef = useRef(null)


  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, '');
  };


  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedPhoneNumber = formatPhoneNumber(formData.telephone);
      const formattedData = { ...formData, telephone: parseInt(formattedPhoneNumber, 10) };


      const response = await axios.post('http://localhost:3030/technicians', formattedData);

      toast.success('Técnico cadastrado com sucesso!')

      setFormData({
        name: '',
        telephone: '',
        email: '',
        address: '',
      });




      setError(null);
    } catch (error) {

      if (error.response) {
        setError(error.response.data.message || 'Erro ao processar a solicitação.');
      } else {
        setError(error.message || 'Erro ao processar a solicitação.');
      }
      toast.error('Erro ao cadastrar técnico');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (

    <div className="form-container" style={{ padding: '20px' }}>
      <h2 style={{ padding: '20px' }}>Cadastrar Técnico</h2>

      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <label className='form-label'>
            Nome:
            <input
              className='form-field'
              type="text"
              placeholder='Digite o nome'
              name="name"
              value={formData.name}
              onChange={handleChange}
              required

            />
          </label>
        </div>
        <br />
        <div className='form-container'>
          <label className="form-label" >
            Telefone:
            <InputMask
              className='form-field'
              type="text"
              mask="(99) 9 9999-9999"
              placeholder='(XX) X XXXX-XXXX'
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required

              ref={telephoneInputRef}
            />
          </label>
        </div>
        <br />
        <div className='form-container'>
          <label className="form-label">
            Email:
            <input
              className='form-field'
              type="email"
              placeholder='Digite o e-mail'
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <br />
        <div className='form-container'>
          <label className="form-label" >
            Endereço:
            <input
              className='form-field'
              type="text"
              name="address"
              placeholder='Digite o endereço'
              value={formData.address}
              onChange={handleChange}
              required

            />
          </label>
        </div>
        <br />
        <button
          type="submit"
          className='form-button'

        >
          Cadastrar
        </button>
        <button
          type="button" onClick={handleCancel}
          className='form-button-cancel'
        >
          Cancelar
        </button>
      </form>

      <br />
      <ToastContainer />


      <Link to="/" style={{ display: 'block', marginTop: '20px', backgroundColor: '#000204', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }}>
        Voltar para consulta
      </Link>
    </div>
  );
};

export default TechnicianForm;
