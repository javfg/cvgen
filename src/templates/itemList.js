import React from 'react';
import { graphql } from 'gatsby';

import '../styles/itemlist.scss';
import Title from '../components/title';

export default function ItemList({ caption, data }) {
  const { title, items } = data.nodes[0].frontmatter;

  return (
    <section className="itemlist-section">
      <Title caption={caption || title} />
      <article>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export const query = graphql`
  fragment itemListData on MarkdownRemark {
    id
    frontmatter {
      title
      items
    }
  }
`;
