import {
  faCaretLeft,
  faMagnifyingGlass,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import '../styles/sidemenu.scss';

function SideMenu({ selection = 'cv', documentHandler }) {
  const [zoom, setZoom] = useState(1);
  const [visible, setVisible] = useState(true);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const keyPressListener = window.addEventListener('keydown', e => {
      switch (e.key.toLowerCase()) {
        case 'h':
          handleHideClick();
          break;
        case '1':
          documentHandler('cv');
          break;
        case '2':
          documentHandler('cl');
          break;
        case '0':
          handleZoomClick();
          break;
        case '+':
          handleZoomClick(0.25);
          break;
        case '-':
          handleZoomClick(-0.25);
          break;
        case 'p':
          handlePrintClick();
          break;
        default:
      }
    });
    return () => window.removeEventListener('keypress', keyPressListener);
  }, [documentHandler]);

  const handleHideClick = () => {
    setVisible(visible => !visible);
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleZoomClick = (value = -1) => {
    setZoom(zoom => (value === -1 ? 1 : Math.min(4, Math.max(0.25, zoom + value))));
  };

  useLayoutEffect(() => {
    if (navigator.userAgent.toLowerCase().includes('firefox')) {
      document.getElementById('page').style.transform = `scale(${zoom})`;
    }
    document.getElementById('page').style.zoom = zoom;
  }, [zoom]);

  const tabIndexWhenInvisible = !visible ? { tabIndex: -1 } : {};

  return (
    <div ref={sideMenuRef} className="side-menu">
      <div className="side-menu-column">
        <button
          className="long"
          title={`${visible ? 'Hide' : 'Show'} controls (h)`}
          onClick={handleHideClick}
        >
          <FontAwesomeIcon className={visible ? 'ico' : 'ico rotated'} icon={faCaretLeft} />
        </button>
      </div>
      <div className="side-menu-column hidable" style={{ left: visible ? 0 : -160 }}>
        <button
          className={`side-menu-button${selection === 'cv' ? ' selected' : ''}`}
          title="Go to Curriculum Vitae (1)"
          onClick={() => documentHandler('cv')}
          {...tabIndexWhenInvisible}
        >
          Curriculum Vitae
        </button>
        <button
          className={`side-menu-button${selection === 'cl' ? ' selected' : ''}`}
          title="Go to Cover Letter (2)"
          onClick={() => documentHandler('cl')}
          {...tabIndexWhenInvisible}
        >
          Cover Letter
        </button>
        <div className="side-menu-row spaced">
          <button
            className="side-menu-button small"
            title="Zoom out (-)"
            onClick={() => handleZoomClick(-0.25)}
            {...tabIndexWhenInvisible}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          </button>
          <button
            className="side-menu-button small"
            title="Reset zoom (0)"
            onClick={() => handleZoomClick()}
            {...tabIndexWhenInvisible}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            className="side-menu-button small"
            title="Zoom in (+)"
            onClick={() => handleZoomClick(0.25)}
            {...tabIndexWhenInvisible}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </button>
        </div>
        <div className="side-menu-row">
          <button
            className="side-menu-button small"
            title="Open print dialog (p)"
            onClick={handlePrintClick}
            {...tabIndexWhenInvisible}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
