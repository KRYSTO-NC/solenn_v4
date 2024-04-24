import React from 'react'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

const NewProductForm = ({value}) => {

    const {data:products}= useGetProductsQuery(value)
    console.log(products);
  return (
   <>
    <div>Ajouter un produits</div>
    <div className="form">
        <label htmlFor="product">Produit</label>
        <select name="product" id="product">
            {products?.map((product)=>(
                <option key={product.ref} value={product.ref}>{product.label}</option>
            ))}
        </select>
        <label htmlFor="quantity">Quantité</label>
        <input type="number" name="quantity" id="quantity" />
        <button className='btn btn-primary'>Ajouter</button>
    </div>
   </>
  )
}

export default NewProductForm