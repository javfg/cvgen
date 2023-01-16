import React from 'react';

import '../styles/title.scss';

function Title({ caption = 'Title' }) {
  const slices = [caption.slice(0, 3), caption.slice(3)];

  return (
    <div className="title">
      <h1>
        <span className="title-start">{slices[0]}</span>
        {slices[1]}
      </h1>
      <hr />
    </div>
  );
}

export default Title;
