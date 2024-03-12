import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container'>
      <div className="notFound-container">
        <h1 className='x-large text-danger'>OUPS</h1>
    
        <p className='lead text-danger'>Désolée, la page que vous demandez n'est pas trouvée.</p>
        <Link className='btn btn-primary' to={"/"}>Retour à l'accueil</Link>
      </div>
    </div>
  );
}

export default NotFound;