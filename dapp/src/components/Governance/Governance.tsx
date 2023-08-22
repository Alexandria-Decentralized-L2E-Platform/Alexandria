import React from 'react';
import alexandriaLogo from '../../logo/alexandriaLogo.svg';

function Governance() {
  return (
    <div className="Container">
      <h1>Governance</h1>
      <div className="emptyCert">
        <img src={alexandriaLogo} width={200}></img>
        <div className="brownText" style={{ fontSize: 28 }}>
          Under Construction
        </div>
      </div>
    </div>
  );
}

export default Governance;
