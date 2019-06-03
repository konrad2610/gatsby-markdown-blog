import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import footerStyles from './footer.module.scss'

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                    currentYear
                }
            }
        }
    `);

    return (
        <footer className={footerStyles.footer}>
            <a href="https://twitter.com/konrad_beska">twitter</a>
            <p>© Copyright {data.site.siteMetadata.currentYear} {data.site.siteMetadata.author}</p>
        </footer>
    );
};

export default Footer;