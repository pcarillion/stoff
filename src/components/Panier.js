import React, {useState, useEffect} from 'react'
import trashLogo from '../img/trash.png';

const Panier = ({items, products, fraisDePort, callback}) => {

    const [numbers, setNumbers] = useState(0)


    const [total, setTotal] = useState(0);


    useEffect(() => {
        let inner_total = 0;
        if (!isNaN(fraisDePort[1]/100*fraisDePort[2])) {
            Object.keys(items).map(key => {
                inner_total += items[key][2]/100*items[key][0]
            })
            inner_total += fraisDePort[1]/100*fraisDePort[2];
        }
        setTotal(inner_total)     
    }, [items, fraisDePort])

    const callback_delete = (id) => {
        callback(id)
    }



    return (
        <div className="panier-details">
            {items && Object.keys(items).map(key => (
                <div key={key} className="panier-line"> {items[key][1]}   |   quantité: {items[key][0]}   |   {items[key][2]/100*items[key][0]}  € <img onClick={() => callback_delete(key)} className="trash-icon" src={trashLogo}/></div>
            ))}
            <div className="total-div">
                {fraisDePort != 0 && <div>Frais de port : {fraisDePort[1]/100*fraisDePort[2]} €</div>}
                {total != 0 && <div>Total : {total} €</div>}
            </div>
        </div>
    )
}

export default Panier
