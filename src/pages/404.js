import React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => {
  return <Link to="/">Go home</Link>;
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;
