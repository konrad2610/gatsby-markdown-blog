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
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
              ) {
                edges {
                    node {
                        fields {
                            slug
                            langKey
                            directoryName
                        }
                    }
                }
            }
        }
    `);
    const posts = res.data.allMarkdownRemark.edges;
    const translationsByDirectory = posts.reduce((result, post) => {
            const directoryName = post.node.fields.directoryName;
            const langKey = post.node.fields.langKey;

            if (directoryName && langKey) {
                (result[directoryName] || (result[directoryName] = [])).push(langKey);
            }

            return result;
        }, {});   

    Object.keys(supportedLanguages).forEach(langKey => {
        createPage({
            component: blogIndexTemplate,
            path: langKey === 'en' ? '/blog/' : `/blog/${langKey}/`,
            context: {
                langKey
            },
        });
    });

    posts.forEach((post) => {
        const allTranslations = translationsByDirectory[post.node.fields.directoryName] || [];
        const translations = allTranslations.filter((translation) => {
            return translation !== post.node.fields.langKey;
        });
        
        createPage({
            component: blogPostTemplate,
            path: `/blog${post.node.fields.slug}`,
            context: {
                slug: post.node.fields.slug,
                translations
            }
        });    
    });
};