import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Head from '../components/head';
import Panel from '../components/panel';

import { codeToLanguage, createLanguageLink } from '../utils/i18n';

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
            html
            fields {
                slug
                langKey
            }
        }
    }
`;

class Translations extends React.Component {
    render() {
      let { translations, lang, languageLink } = this.props;
  
      return (
        <div className="translations">
          <Panel>
            {translations.length > 0 && (
              <span>
                <span>You can also read this article in: </span>
                {translations.map((translationLang, i) => (
                  <React.Fragment key={translationLang}>
                    {translationLang === lang ? (
                      ''
                    ) : (
                      <Link to={languageLink(translationLang)}>{codeToLanguage(translationLang)}</Link>
                    )}
                    {i === translations.length - 1 ? '' : ', '}
                  </React.Fragment>
                ))}
              </span>
            )}
            {lang !== 'en' && (
              <>
                <br />
                <span>View all posts in </span>
                <Link to={`/blog/${lang}`}>{codeToLanguage(lang)}</Link>
              </>
            )}
          </Panel>
        </div>
      );
    }
  }

const Blog = (props) => {
    const post = props.data.markdownRemark;
    let {
      slug,
      translations
    } = props.pageContext;
    const lang = post.fields.langKey;
    const languageLink = createLanguageLink(slug, lang);

    return (
        <Layout>
            <Head title={props.data.markdownRemark.frontmatter.title}/>
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <p>{props.data.markdownRemark.frontmatter.date}</p>
            {translations.length > 0 && (
                <Translations
                  translations={translations}
                  languageLink={languageLink}
                  lang={lang}
                />
              )}
            <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
        </Layout>
    );
};

export default Blog;