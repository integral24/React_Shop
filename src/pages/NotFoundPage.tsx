import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено :(
      </h1>
      <p className="not-found-page description">
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundPage;
