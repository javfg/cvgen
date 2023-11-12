import React from 'react';

import '../styles/title.scss';

function Title({ caption = 'Title', colored = 0 }) {
  const slices = [caption.slice(0, colored), caption.slice(colored)];

  return (
    <div className="title">
      <h1>
        {colored ? (
          <>
            <span className="title-start">{slices[0]}</span>
            {slices[1]}
          </>
        ) : (
          slices[1]
        )}
      </h1>
      <hr />
    </div>
  );
}

export default Title;
