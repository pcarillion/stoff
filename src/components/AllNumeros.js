import React from 'react'

const AllNumeros = ({numeros, callback, state}) => {



    const allNumerosDisplayed = {}
    // useEffect(() => {
    //     console.log(state)
    //     if (state) {
    //         allNumerosDisplayed.display = 'none'
    //     }
    // },state)

    console.log(state)
    if (state) {
        allNumerosDisplayed.display = 'none';
    } else {
        allNumerosDisplayed.display = 'flex'
    }

    return (
        <div className='all-numeros-container' style={allNumerosDisplayed}>
            {numeros.edges.map((numero, i) => {
                return <div key={i} className='all-numeros-card' onClick={()=> callback(numero.node.numero)}>
                    <div className='all-numeros-card-image'></div>
                    <h4 className='all-numeros-card-title'>numéro {numero.node.numero} - {numero.node.dateDePublication}</h4>
                    <p className='all-numeros-themes'>thème 1</p>
                    <p className='all-numeros-themes'>thème 2</p>
                    <p className='all-numeros-themes'>thème 3</p>
                    <p className='all-numeros-themes'>thème 4</p>
                </div>
            })}
        </div>
    )
}

export default AllNumeros
