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
    <div className="technician-list-container" style={{ padding: '20px' }}>
      <h2>Detalhes do cadastro</h2>
      <p>
        <strong>Nome:</strong> {technician.name}
      </p>
      <p>
        <strong>Telefone:</strong> {technician.telephone}
      </p>
      <p>
        <strong>Email:</strong> {technician.email}
      </p>
      <p>
        <strong>Endereço:</strong> {technician.address}
      </p>
      <Link to="/" style={{ display: 'block', marginTop: '20px', backgroundColor: '#007BFF', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }}>
        Voltar para consulta
      </Link>
    </div>
  );
};

export default TechnicianView;
