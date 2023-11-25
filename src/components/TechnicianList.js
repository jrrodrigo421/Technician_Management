import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TechnicianList.css';

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:3030/technicians');
        setTechnicians(response.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setError('Erro ao carregar os técnicos');
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleDelete = async (id) => {
    try {

      await axios.delete(`http://localhost:3030/technicians/${id}`);


      setTechnicians((prevTechnicians) => prevTechnicians.filter((technician) => technician.id !== id));
    } catch (error) {
      console.error('Error deleting technician:', error);

    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="technician-list-container">
      <h2>Consulta Técnicos</h2>
      <Link to="/add" className="add-technician-link">Cadastrar Novo Técnico</Link>

      <table className="technician-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.name}</td>

              <td>
                <Link to={`/view/${technician.id}`} className="view-technician-link">Detalhes</Link>
                <Link to={`/edit/${technician.id}`} className="edit-technician-link">Editar</Link>
                <button onClick={() => handleDelete(technician.id)} className="delete-technician-button">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianList;
