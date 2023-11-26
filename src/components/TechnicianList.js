import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



import './TechnicianList.css';
import './design.css'

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

    const confirmed = window.confirm('Tem certeza que deseja excluir este técnico?');

    if (!confirmed) {
      return;
    }

    try {

      await axios.patch(`http://localhost:3030/technicians/${id}`, { deleted: true });


      setTechnicians((prevTechnicians) =>
        prevTechnicians.filter((technician) => technician.id !== id)
      );
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

  const filteredTechnicians = technicians.filter((technician) => !technician.deleted);

  return (
    <div className="technician-list-container">
      <h2>Página de consulta</h2>
      <Link to="/add" className="theme-button">Novo cadastro</Link>

      <table className="technician-table ">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.name}</td>

              <td>
                <Link to={`/view/${technician.id}`} className="action-button details-button">Detalhes</Link>
                <Link to={`/edit/${technician.id}`} className="action-button edit-button">Editar</Link>
                <button onClick={() => handleDelete(technician.id)} className="delete-button">
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
