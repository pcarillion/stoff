const path = require("path")


exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const {data} = await graphql(` 
    query {
        auFil: allContentfulAuFilDeLeau(sort:{fields:date, order:ASC}){ 
            edges{
                node{
                    adresseUrl
                    }
            }
        }
        articles: allContentfulArticleEnAccesLibre {
            edges{
                node{
                    url
                }
            }
        }
        articlesblocked: allContentfulArticleSansAccesLibre {
            edges{
                node{
                    url
                }
            }
        }
        materiau: allContentfulMateriau {
            edges{
                node{
                    url
                }
            }
        }
    }
    `)



    data.auFil.edges.forEach(({node}) => {
        createPage({
            path: `au-fil/${node.adresseUrl}`,
            component: path.resolve('./src/templates/AuFilArticle.js'),
            context: {
                url: node.adresseUrl
            }
        })
    })

    data.articles.edges.forEach(({node}) => {
        createPage({
            path: `article/${node.url}`,
            component: path.resolve('./src/templates/article.js'),
            context: {
                url: node.url
            }
        })
    })

    data.articles.edges.forEach(({node}) => {
        createPage({
            path: `numeros/materiaux/${node.url}`,
            component: path.resolve('./src/templates/materiau.js'),
            context: {
                url: node.url
            }
        })
    })

    data.articlesblocked.edges.forEach(({node}) => {
        createPage({
            path: `numeros/article/${node.url}`,
            component: path.resolve('./src/templates/article-blocked.js'),
            context: {
                url: node.url
            }
        })
    })

    data.articlesblocked.edges.forEach(({node}) => {
        createPage({
            path: `numeros/materiaux/${node.url}`,
            component: path.resolve('./src/templates/materiau.js'),
            context: {
                url: node.url
            }
        })
    })

    data.materiau.edges.forEach(({node}) => {
        createPage({
            path: `materiau/${node.url}`,
            component: path.resolve('./src/templates/materiau-single.js'),
            context: {
                url: node.url
            }
        })
    })
}

