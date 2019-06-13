const path = require('path');
const { supportedLanguages } = require('./i18n');

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const directoryName = path.basename(path.dirname(node.fileAbsolutePath));

        createNodeField({
            node,
            name: 'directoryName',
            value: directoryName
        });
    }
};

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const blogTemplate = path.resolve('./src/templates/blog-post.js');
    const blogIndexTemplate = path.resolve('./src/templates/blog-index.js');
    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
        createPage({
            component: blogIndexTemplate,
            path: langKey === 'en' ? '/blog/' : `/blog/${langKey}/`,
            context: {
                langKey
            },
        });
    });

    res.data.allMarkdownRemark.edges.forEach((post) => {
        createPage({
            component: blogTemplate,
            path: `/blog${post.node.fields.slug}`,
            context: {
                slug: post.node.fields.slug
            }
        });    
    });
};