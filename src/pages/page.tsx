 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NextPage } from 'next';

const PrintPage: NextPage = () => {
  const [printing, setPrinting] = useState(false);
  const [ports, setPorts] = useState([]);

  const handlePrint = async () => {
    try {
      setPrinting(true);
      const response = await axios.post('/api/print');

      console.log('resposta!', response);

      if (response.data.success) {
        console.log('Cupom impresso com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao imprimir o cupom:', error);
    } finally {
      setPrinting(false);
    }
  };

  // useEffect(() => {
  //   const fetchPorts = async () => {
  //     try {
  //       const response = await axios.get('/api/list-ports');
  //       setPorts(response.data);
  //     } catch (error) {
  //       console.error('Erro ao obter lista de portas seriais:', error);
  //     }
  //   };
  //   fetchPorts();
  // }, []);

  return (
    <div>
    <div>
      <h2>Portas Seriais Disponíveis:</h2>
      <ul>
          {ports.map((port) => (
            <li key={port}>{port}</li>
          ))}
        </ul>
    </div>
    <button onClick={handlePrint} disabled={printing}>
      Imprimir Cupom
    </button>
  </div>

  );
};

export default PrintPage;
