module.exports = {
    siteMetadata: {
        author: 'Konrad Beska',
        title: 'WebDevNotes',
        currentYear: '2019'
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-i18n',
            options: {
                langKeyDefault: 'en',
                pagesPaths: [`src/posts/`],
                useLangKeyLayout: false
            }
        }
    ]
};