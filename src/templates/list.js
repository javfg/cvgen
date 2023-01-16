import React, { useLayoutEffect, useRef, useState } from 'react';
import { graphql } from 'gatsby';

import '../styles/list.scss';
import Title from '../components/title';

export default function List({ caption, data }) {
  const { entries } = data.nodes[0].frontmatter;
  const entryRefs = useRef([]);
  const [entryTitleWidth, setEntryTitleWidth] = useState(null);

  useLayoutEffect(() => {
    entryRefs.current.forEach(er => setEntryTitleWidth(a => Math.max(er.offsetWidth, a)));
  }, []);

  return (
    <section className="list-section">
      <Title caption={caption} />
      <article>
        <ul>
          {entries.map((entry, i) => (
            <li key={i}>
              <div className="list-item">
                <strong
                  ref={e => (entryRefs.current[i] = e)}
                  style={{ minWidth: entryTitleWidth || 'auto' }}
                >
                  {entry.title}
                </strong>
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
