import React from 'react'
import './CardAdministratif.css'
const CardAdministratif = ({ logo, title, data }) => {
  console.log(data)
  return (
    <div className="card-administratif">
      <h3>{title}</h3>
      <div className="line"></div>
      <div className="cardAdminTop">
        <p>
          <strong>Status</strong>
        </p>
        <p className="badge badge-primary">{data.status}</p>
      </div>
      <div className="cardAdminTop">
        <p>
          <strong>Date demande</strong>
        </p>
        <p className="badge badge-primary">
          {data.date && new Date(data.date).toLocaleDateString()}
        </p>
      </div>

      <div className="img-container">
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default CardAdministratif
