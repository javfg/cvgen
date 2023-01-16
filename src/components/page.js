import React from 'react';

import '../styles/page.scss';

function Page({ children }) {
  return (
    <div id="page" className="page">
      {children}
    </div>
  );
}

export default Page;
