import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


import Modal from 'react-modal';

Modal.setAppElement('#root');


const TechnicianView = () => {
  const { id } = useParams();
  const [technician, setTechnician] = useState(null);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/technicians/${id}`);
        setTechnician(response.data);
        setModalIsOpen(true);
      } catch (error) {
        console.error('Error fetching technician details:', error);
        setError('Error fetching technician details.');
      }
    };

    fetchTechnicianDetails();
  }, [id]);

  const closeModal = () => {
    setModalIsOpen(false);
    history('/')
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!technician) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      {technician && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Detalhes do Cadastro'
          className="modal-content"
          style={{
            overlay: { backgroundColor: 'rgba(5, 58, 151, 0.8)' },
            content: {
              width: '500px',
              height: '200px', margin: 'auto', top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
            },
          }}
        >
          <div className="technician-list-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Detalhes do Cadastro</h2>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              <strong>Nome:</strong> {technician.name}
            </p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              <strong>Telefone:</strong> {technician.telephone}
            </p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              <strong>Email:</strong> {technician.email}
            </p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>
              <strong>Endereço:</strong> {technician.address}
            </p>
            <button onClick={closeModal} style={{ marginTop: '20px', backgroundColor: '#010408', color: 'white', padding: '12px 18px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
              Fechar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TechnicianView;
