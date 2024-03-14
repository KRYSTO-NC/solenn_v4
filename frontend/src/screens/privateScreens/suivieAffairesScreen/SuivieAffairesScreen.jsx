import React from 'react'
import { Link } from 'react-router-dom'

const SuivieAffairesScreen = () => {
  return (
    <div className='container'>
        <h1 className="large">Suivie des affaires</h1>
   
             <table className="table">
                
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Nom</th>
                        <th>Charg.</th>
                        <th>Type</th>
                        <th>Date Accord</th>
                        <th>Dem. concess</th>
                        <th>Obt. concess</th>
                        <th>Dem. Dimenc</th>
                        <th>Obt. Dimenc</th>
                        <th>Acpte. reçu</th>
                        <th>Prev pose</th>
                        <th>Cotsuel</th>
                        <th>facture</th>
                        <th>Commentaires</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>   <Link>20224-343</Link> </td>
                        <td>Laurens</td>
                        <td>WG</td>
                        <td>autoconso</td>
                        <td>21/12/2024</td>
                        <td style={{backgroundColor:'green'}}>21/12/2024</td>

                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td>EEC relancé le 10/01/24 et 24/01/24</td>
                    </tr>
                    <tr>
                        <td>   <Link>20224-343 </Link> </td>
                        <td>Ecole les Orchidées</td>
                        <td>WG</td>
                        <td>autoconso</td>
                        <td>21/12/2024</td>
                        <td style={{backgroundColor:'green'}}>21/12/2024</td>
                        <td style={{backgroundColor:'green'}}>21/12/2024</td>
                        <td style={{backgroundColor:'green'}}>21/12/2024</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td style={{backgroundColor:'red', color:"white"}}>--/--/--</td>
                        <td>EEC relancé le 10/01/24 et 24/01/24</td>
                    </tr>
                   
                   
   
                    </tbody>
                </table>   
    </div>
  )
}

export default SuivieAffairesScreen