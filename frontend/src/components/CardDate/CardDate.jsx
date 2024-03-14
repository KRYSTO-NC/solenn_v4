import React from 'react'

const CardDate = ({title, data}) => {
  return (
    <div className='card-date'>
        <h2>{title}</h2>

        {data.status === 'En Attente'? (
            <p>status  <span className='badge badge-success' >{data.status} </span></p>
            ): (
            <p>status  <span className='badge badge-danger' >{data.status} </span></p>

        )}
        
        {data.date ? (
            <p>{data.date}</p>
        ): (
            ''
        )}
    </div>
  )
}

export default CardDate