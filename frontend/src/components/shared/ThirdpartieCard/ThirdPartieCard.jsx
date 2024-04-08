import React from 'react';
import { useGetThirdPartyDetailsQuery } from '../../../slices/dolibarr/dolliThirdPartyApiSlice';
import './thirdpartieCard.css';
import { Link } from 'react-router-dom';

const ThirdPartieCard = ({ tierId, title }) => {
  const { data: tier, isLoading, error } = useGetThirdPartyDetailsQuery(tierId);
  console.log();
  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p variant="danger">{error?.data?.message || error.message}</p>
      ) : (
        <div className='ThirdPartieCard'>
            <h3>{title}</h3>
          <p>
            {tier.name}
          </p>
          <h5>email</h5>
          <p>
            {tier.email || <span style={{ color: 'red' }}>Non renseignée</span>}
          </p>
          <h5>Adresse</h5>
          <p>
            {tier.address || <span style={{ color: 'red' }}>Non renseignée</span>}
          </p>

          <Link className='btn btn-primary' target="_blank" to={`https://solis-erp.square.nc/societe/card.php?socid=${tier.id}&save_lastsearch_values=1`} >
            Voir dans dolibarr
          </Link>
        </div>
      )}
    </>
  );
};

export default ThirdPartieCard;
