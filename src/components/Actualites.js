import React from 'react'
import SingleCard from './singleCard'

const Actualites = ({articles}) => {
    return (
        <section className='actualites-section'>
            {articles.map((article, i) => {
                {/* let theArticle = article.node */}
                return <SingleCard article={article} i={i} numero={false}/>
            })}
        </section>
    )
}

export default Actualites
