import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';

import '../styles/header.scss';

const ContactEntry = ({ icon, value, url }) => (
  <li>
    <FontAwesomeIcon icon={icon} />{' '}
    <a
      tabIndex={-1}
      className="header-contact"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {value}
    </a>
  </li>
);

export default function Header({ data, align = 'center' }) {
  const {
    firstname,
    lastname,
    titles,
    address: { address },
    contact,
  } = data.nodes[0].frontmatter;

  return (
    <header style={{ alignItems: align }}>
      <h1>
        <span>{firstname}</span> <span>{lastname}</span>
      </h1>
      <span className="header-titles">{titles.join(' · ')}</span>
      <hr className={`${align === 'end' ? 'hr-end' : ''}`} />
      <ul>
        <li>{address.join(' · ')}</li>
        {contact.map(ce => (
          <ContactEntry key={ce.icon} {...ce} />
        ))}
      </ul>
    </header>
  );
}

export const query = graphql`
  fragment headerData on MarkdownRemark {
    id
    frontmatter {
      firstname
      lastname
      titles
      address {
        address
      }
      contact {
        value
        url
        icon
      }
    }
  }
`;
