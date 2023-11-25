import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TechnicianList.css';

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Função para buscar técnicos do backend
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

    // Chama a função para buscar técnicos ao montar o componente
    fetchTechnicians();
  }, []); // O array vazio como segundo argumento garante que o useEffect só será chamado uma vez, equivalente a componentDidMount

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="technician-list-container">
      <h2>Lista de Técnicos</h2>
      <Link to="/add" className="add-technician-link">Cadastrar Novo Técnico</Link>

      <table className="technician-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.name}</td>
              <td>{technician.email}</td>
              <td>{technician.telephone}</td>
              <td>{technician.address}</td>
              <td>
                <Link to={`/view/${technician.id}`} className="view-technician-link">Ver</Link>
                <Link to={`/edit/${technician.id}`} className="edit-technician-link">Editar</Link>
                {/* Adicione a lógica de exclusão aqui */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicianList;
