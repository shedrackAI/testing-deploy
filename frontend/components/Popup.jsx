import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const Popup = ({children}) => {
  const { 
    setShowPopup, 
    showPopup,
 } = useContext(AppContext);

  return (
    <div>
      {showPopup && (
        <div
          className="fixed z-50 top-0 right-0 bottom-0 left-0 flex px-5 justify-center backdrop-blur-sm overflow-scroll"
          onClick={() => setShowPopup(false)}
        >
          <div
            className=""
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
