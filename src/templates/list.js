import React from 'react';
import { graphql } from 'gatsby';

import '../styles/list.scss';
import Title from '../components/title';

export default function List({ caption, data, inline }) {
  const { entries } = data.nodes[0].frontmatter;

  return (
    <section className="list-section">
      <Title caption={caption} />
      <article>
        <ul className={`${inline ? 'inline' : ''}`}>
          {entries.map((entry, i) => (
            <li key={i}>
              <div className="list-item">
                <strong>{entry.title}</strong>
                <span>{entry.content}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export const query = graphql`
  fragment listData on MarkdownRemark {
    id
    frontmatter {
      title
      entries {
        title
        content
      }
    }
  }
`;
