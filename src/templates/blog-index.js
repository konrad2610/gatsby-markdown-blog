import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from '../styles/blog.module.scss';
import Head from '../components/head';

export const blogIndexPageQuery = graphql`
    query($langKey: String!) {
        allMarkdownRemark(
            filter: { fields: { langKey: { eq: $langKey } } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    fields {
                        slug
                        langKey
                    }
                    timeToRead
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                    }
                }
            }
        }
    }
`;

const BlogPage = (props) => {
    return (
        <Layout>
            <Head title="Blog"/>
            <h1>Blog Page</h1>
            <ol className={blogStyles.posts}>
                {props.data.allMarkdownRemark.edges.map((post) => {
                    return (
                        <li className={blogStyles.post}>
                            <Link to={`/blog${post.node.fields.slug}`}>
                                <h1>{post.node.frontmatter.title}</h1>
                                <p>{post.node.frontmatter.date}</p>
                            </Link>
                        </li>
                    );
                })}
            </ol>
        </Layout>
    );
};

export default BlogPage;