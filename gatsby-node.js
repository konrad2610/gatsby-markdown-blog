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
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
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
            component: blogPostTemplate,
            path: `/blog${post.node.fields.slug}`,
            context: {
                slug: post.node.fields.slug
            }
        });    
    });
};