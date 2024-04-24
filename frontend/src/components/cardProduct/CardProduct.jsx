import React from 'react'
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import './cardProduct.css'
import { FaTrash } from 'react-icons/fa'
const CardProduct = ({id}) => {
  
  const {data:product} = useGetProductDetailsQuery(id.ref)

  console.log(product);
    return (
    <div>
        <div className="card-product">

             <p>{product?.label}</p>
             <p>Quantité : <span>{id.quantity}</span></p>
            <FaTrash className="trash-icon" />
            </div>
        </div>
  
  )
}

export default CardProduct