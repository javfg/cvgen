import React from 'react';
import { graphql } from 'gatsby';

import Title from '../components/title';
import { removeTabIndexes } from '../utils/utils';

export default function FreeText({ caption, data }) {
  const {
    frontmatter: { title },
    html,
  } = data.nodes[0];

  return (
    <section className="freetext-section">
      <Title caption={title || caption} />
      <article dangerouslySetInnerHTML={{ __html: removeTabIndexes(html) }}></article>
    </section>
  );
}

export const query = graphql`
  fragment freeTextData on MarkdownRemark {
    id
    frontmatter {
      title
    }
    html
  }
`;
