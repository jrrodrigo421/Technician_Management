import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import './TechnicianForm.css'

import InputMask from 'react-input-mask';
import { toast, ToastContainer } from 'react-toastify';
import { useRef } from 'react';

const TechnicianEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, '');
  };

  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    address: '',
  });
  const telephoneInputRef = useRef(null)

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
      const formattedPhoneNumber = formatPhoneNumber(formData.telephone);
      const formattedData = { ...formData, telephone: parseInt(formattedPhoneNumber, 10) };

      await axios.put(`http://localhost:3030/technicians/${id}`, formattedData);

      toast.success('Técnico alterado com sucesso!')


      setError(null);



    } catch (error) {
      console.error('Error editing technician:', error);
      setError(error.response?.data?.message || 'Erro ao editar técnico.');
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

export default TechnicianEdit;
