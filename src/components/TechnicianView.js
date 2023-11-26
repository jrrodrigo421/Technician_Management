import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';



const TechnicianView = () => {
  const { id } = useParams();
  const [technician, setTechnician] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/technicians/${id}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician details:', error);
        setError('Error fetching technician details.');
      }
    };

    fetchTechnicianDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!technician) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="technician-view-container" style={{ backgroundImage: 'url(/logo_pratica_branco.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>

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
      <Link to="/" style={{ display: 'block', marginTop: '20px', backgroundColor: '#007BFF', color: 'white', padding: '12px 18px', borderRadius: '5px', textDecoration: 'none', fontSize: '18px' }}>
        Voltar para Consulta
      </Link>
    </div>
    // </div>
  );
};

export default TechnicianView;
