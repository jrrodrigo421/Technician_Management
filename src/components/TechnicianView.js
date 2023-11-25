// // src/components/TechnicianView.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TechnicianView = (props) => {
//   const { match } = props;
//   const [technician, setTechnician] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTechnicianDetails = async () => {


//       if (!match || !match.params || !match.params.id) {
//         setError('ID do técnico não fornecido.');
//         return;
//       }

//       const { id } = match.params.id;

//       try {
//         const response = await axios.get(`http://localhost:3030/technicians/${id}`);
//         setTechnician(response.data);
//       } catch (error) {
//         console.error('Error fetching technician details:', error);
//         setError('Erro ao obter detalhes do técnico.');
//       }
//     };

//     fetchTechnicianDetails();
//   }, [match]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!technician) {
//     return <div>Carregando...</div>;
//   }

//   return (
//     <div>
//       <h1>Technician Details</h1>
//       <p>Nome: {technician.name}</p>
//       <p>Telefone: {technician.telephone}</p>
//       <p>Email: {technician.email}</p>
//       <p>Endereço: {technician.address}</p>
//     </div>
//   );
// };

// export default TechnicianView;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// const TechnicianView = () => {
//   const { id } = useParams();
//   const [technician, setTechnician] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTechnicianDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3030/technicians/${id}`);
//         setTechnician(response.data);
//       } catch (error) {
//         console.error('Error fetching technician details:', error);
//         setError('Error fetching technician details.');
//       }
//     };

//     fetchTechnicianDetails();
//   }, [id]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!technician) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ marginBottom: '20px' }}>Technician Details</h2>
//       <p>
//         <strong>Name:</strong> {technician.name}
//       </p>
//       <p>
//         <strong>Telephone:</strong> {technician.telephone}
//       </p>
//       <p>
//         <strong>Email:</strong> {technician.email}
//       </p>
//       <p>
//         <strong>Address:</strong> {technician.address}
//       </p>
//       <Link to="/" style={{ display: 'block', marginTop: '20px' }}>
//         Back to Technician List
//       </Link>
//     </div>
//   );
// };

// export default TechnicianView;



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
      <h2>Technician Details</h2>
      <p>
        <strong>Name:</strong> {technician.name}
      </p>
      <p>
        <strong>Telephone:</strong> {technician.telephone}
      </p>
      <p>
        <strong>Email:</strong> {technician.email}
      </p>
      <p>
        <strong>Address:</strong> {technician.address}
      </p>
      <Link to="/" className="view-technician-link">
        Back to Technician List
      </Link>
    </div>
  );
};

export default TechnicianView;
