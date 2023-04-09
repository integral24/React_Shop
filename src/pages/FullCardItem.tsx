// import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FullCardItem: React.FC = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // async function getCurrentPizza() {
    //   try {
    //     const { data } = await axios.get();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }, []);

  return (
    <div className="full-card-item">
      <p>Страница полной информации о товаре</p>
    </div>
  );
};

export default FullCardItem;
