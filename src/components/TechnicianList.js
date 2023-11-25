import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
    <div>
      <h2>Lista de Técnicos</h2>
      <Link to="/add">Cadastrar Novo Técnico</Link>

      <ul>
        {technicians.map((technician) => (
          <li key={technician.id}>
            {technician.name}
            <Link to={`/view/${technician.id}`}>Ver</Link>
            <Link to={`/edit/${technician.id}`}>Editar</Link>
            {/* Adicione a lógica de exclusão aqui */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnicianList;
