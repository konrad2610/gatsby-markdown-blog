import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from './blog.module.scss';
import Head from '../components/head';

const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark (
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            date(formatString: "MMMM DD, YYYY")
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <Head title="Blog"/>
            <h1>Blog Page</h1>
            <ol className={blogStyles.posts}>
                {data.allMarkdownRemark.edges.map((post) => {
                    return (
                        <li className={blogStyles.post}>
                            <Link to={`/blog/${post.node.fields.slug}`}>
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