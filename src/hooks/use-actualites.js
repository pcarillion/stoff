import {graphql, useStaticQuery} from "gatsby"
import {useState, useEffect} from 'react'

const getData = graphql`
query{
	aufil:allContentfulAuFilDeLeau{
        edges{
          node{
            auteur
            date
            __typename
            prsentationDuTexte {
              childMarkdownRemark{
                  html
                }
            }
            titre
            url: adresseUrl
            image{
              fluid{
                  ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    articlesNumeros:allContentfulArticleEnAccesLibre{
    edges{
        node{
          date: dateDePublication
          url
          __typename
          titre
          extrait{json}
          image: photoPrincipale {
              fluid {
                  ...GatsbyContentfulFluid
              }
          }
        }
    }
    }
    materiaux:allContentfulMateriau{
    edges{
        node{
          date: dateDePublication
          titre
          auteur
          __typename
          url
          extrait: presentation{json}
          image {
            fluid {
                ...GatsbyContentfulFluid
            }
          }
          article {
            ... on ContentfulArticleEnAccesLibre {
              id
              titre
            }
            ... on ContentfulArticleSansAccesLibre {
              id
              titre
            }
          }
        }
    }
    }
}
`




const useActualites = () => {
    const [data, setData] = useState({});
    const {aufil, articlesNumeros, materiaux} = useStaticQuery(getData);
    useEffect(() => {
        setData({aufil, articlesNumeros, materiaux})
    }, [])

    // populate the array to send
    let articlesArray = aufil.edges.concat(articlesNumeros.edges).concat(materiaux.edges)

    // sort array
    articlesArray.sort(function(a,b){
        let dateA = a.node.date
        let dateB = b.node.date 
        return new Date(dateB) - new Date(dateA);
      });

    // take first ten elements
    articlesArray = articlesArray.slice(0,10)

    return articlesArray;
}

export default useActualites;