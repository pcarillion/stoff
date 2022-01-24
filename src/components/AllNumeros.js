import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image'

const AllNumeros = ({numeros, callback, state}) => {



    const allNumerosDisplayed = {}
    // useEffect(() => {
    //     console.log(state)
    //     if (state) {
    //         allNumerosDisplayed.display = 'none'
    //     }
    // },state)

    if (state) {
        allNumerosDisplayed.display = 'none';
    } else {
        allNumerosDisplayed.display = 'flex'
    }

    return (
        <div className='all-numeros-container' style={allNumerosDisplayed}>
            {numeros.edges.map((numero, i) => {
                {/* console.log(numero) */}
                return <div key={i} className='all-numeros-card' onClick={()=> callback(numero.node.numero)}>
                    <div className='all-numeros-card-image'>
                        {numero.node.image && <Img className='article-au-fil-image' fluid={numero.node.image.fluid}/>}
                    </div>
                    <h4 className='all-numeros-card-title'>numéro {numero.node.numero} - {numero.node.dateDePublication}</h4>
                    <p>{documentToReactComponents(numero.node.themes.json)} </p>
                    
                </div>
            })}
        </div>
    )
}

export default AllNumeros
