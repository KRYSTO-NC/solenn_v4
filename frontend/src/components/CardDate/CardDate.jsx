import React, { useState } from 'react';

const CardDate = ({ title, data, onDateUpdate }) => {
  const [newDate, setNewDate] = useState('');

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleDateSubmit = () => {
    // Appel de la fonction onDateUpdate pour mettre à jour la date dans SimulationDetails
    onDateUpdate(newDate);
  };

  return (
    <div className="card-date">
      <h2>{title}</h2>
      {data.date ? (
            <p className='card-date-date'>{ new Date(data.date).toLocaleDateString()}</p>
        ): (
          <div className="form">
          <input type="date" value={newDate} onChange={handleDateChange} />
          <button className="btn btn-success" onClick={handleDateSubmit}>
            Valider
          </button>
        </div>
        )}

    
        
       
    </div>
  )
}

export default CardDate