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
  
      let readerTranslations = translations.filter(lang => lang !== 'ru');
  
      return (
        <div className="translations">
          <Panel>
            {translations.length > 0 && (
              <span>
                <span>Translated by readers into: </span>
                {readerTranslations.map((l, i) => (
                  <React.Fragment key={l}>
                    {l === lang ? (
                      <b>{codeToLanguage(l)}</b>
                    ) : (
                      <Link to={languageLink(l)}>{codeToLanguage(l)}</Link>
                    )}
                    {i === readerTranslations.length - 1 ? '' : ' • '}
                  </React.Fragment>
                ))}
              </span>
            )}
            {lang !== 'en' && (
              <>
                <Link to={languageLink('en')}>Read the original</Link>
                <br />
                <Link to={`/blog/${lang}`}>View all translated posts</Link>{' '}
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
      translations,
      translatedLinks,
    } = props.pageContext;
    const lang = post.fields.langKey;
    const languageLink = createLanguageLink(slug, lang);
    const enSlug = languageLink('en');

    return (
        <Layout>
            <Head title={props.data.markdownRemark.frontmatter.title}/>
            {/* <h1>{props.data.markdownRemark.frontmatter.title}</h1> */}
            {/* <p>{props.data.markdownRemark.frontmatter.date}</p> */}
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