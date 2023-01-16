import React from 'react';
import { graphql } from 'gatsby';

import '../styles/coverletter.scss';
import { removeTabIndexes } from '../utils/utils';

export default function CoverLetter({ data }) {
  let {
    frontmatter: {
      address: { recipient, date, datelocale, business, address },
      subject,
      ps,
    },
    html,
  } = data.nodes[0];

  date ||= Date.now();

  return (
    <section className="coverletter-section">
      <div className="coverletter-address">
        <div className="coverletter-businessline">
          <strong>{recipient}</strong>
          <em className="obscured">{new Date(date).toLocaleDateString(datelocale || 'fr-CH')}</em>
        </div>
        <p>{business}</p>
        {address.map((addressLine, i) => (
          <p key={i}>{addressLine}</p>
        ))}
      </div>
      {subject && (
        <div className="coverletter-subject">
          <u>
            <strong>{subject}</strong>
          </u>
        </div>
      )}
      <article dangerouslySetInnerHTML={{ __html: removeTabIndexes(html) }}></article>
      <footer>
        <em className="obscured">{ps}</em>
      </footer>
    </section>
  );
}

export const query = graphql`
  fragment coverLetterData on MarkdownRemark {
    id
    frontmatter {
      address {
        recipient
        date
        datelocale
        business
        address
      }
      subject
      ps
    }
    html
  }
`;
