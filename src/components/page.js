import React from 'react';

import '../styles/page.scss';

function Page({ children, id }) {
  return (
    <div id={id} className="page">
      {children}
    </div>
  );
}

export default Page;
