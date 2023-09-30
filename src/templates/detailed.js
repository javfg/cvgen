import React from 'react';
import { graphql } from 'gatsby';

import '../styles/detailed.scss';
import Title from '../components/title';
import { removeTabIndexes } from '../utils/utils';
import { DateTime } from 'luxon';

const DetailedEntry = ({
  title,
  location,
  subtitle,
  startDateStr,
  endDateStr,
  singleDate,
  html,
}) => (
  <section>
    <div className="detailed-title-container">
      <h2>{title}</h2>
      <em className="accented">{location}</em>
    </div>
    <div className="detailed-title-container">
      <h3>{subtitle}</h3>
      <em>
        {startDateStr}
        {!singleDate && ` – ${endDateStr}`}
      </em>
    </div>
    <article dangerouslySetInnerHTML={{ __html: removeTabIndexes(html) }}></article>
  </section>
);

export default function Detailed({ caption, data, dateFormat: dateFormatFromProps }) {
  const detailedEntries = data.nodes.map(node => {
    const {
      id,
      frontmatter: {
        title,
        location,
        subtitle,
        startDate,
        endDate,
        dateFormat: dateFormatFromMD,
        singleDate,
      },
      html,
    } = node;

    const dateFormat = dateFormatFromMD || dateFormatFromProps || 'MMM yyyy';
    const startDateStr = startDate ? DateTime.fromISO(startDate).toFormat(dateFormat) : '';
    const endDateStr = endDate ? DateTime.fromISO(endDate).toFormat(dateFormat) : '';

    return { id, title, location, subtitle, startDateStr, endDateStr, singleDate, html };
  });

  return (
    <section className="detailed-section">
      <Title caption={caption} />
      {detailedEntries.map(ee => (
        <DetailedEntry key={ee.id} {...ee} />
      ))}
    </section>
  );
}

export const query = graphql`
  fragment detailedData on MarkdownRemark {
    id
    frontmatter {
      title
      location
      subtitle
      startDate
      endDate
      dateFormat
      singleDate
    }
    html
  }
`;
