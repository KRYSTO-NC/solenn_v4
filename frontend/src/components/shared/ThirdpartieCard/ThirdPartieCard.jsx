import React from 'react';
import { useGetThirdPartyDetailsQuery } from '../../../slices/dolibarr/dolliThirdPartyApiSlice';
import './thirdpartieCard.css';

const ThirdPartieCard = ({ tierId, title }) => {
  const { data: tier, isLoading, error } = useGetThirdPartyDetailsQuery(tierId);

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
        </div>
      )}
    </>
  );
};

export default ThirdPartieCard;
