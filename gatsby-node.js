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

    }
    `)

    console.log(data)


    data.auFil.edges.forEach(({node}) => {
        createPage({
            path: `au-fil/${node.adresseUrl}`,
            component: path.resolve('./src/templates/AuFilArticle.js'),
            context: {
                url: node.adresseUrl
            }
        })
    })
}

