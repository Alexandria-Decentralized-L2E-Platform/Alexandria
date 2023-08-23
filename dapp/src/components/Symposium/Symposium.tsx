import React from 'react';
import alexandriaLogo from '../../logo/alexandriaLogo.svg';

function Symposium() {
  return (
    <div className="Container Main">
      <h1>Symposium</h1>
      <div className="emptyCert">
        <img src={alexandriaLogo} width={200}></img>
        <div className="brownText" style={{ fontSize: 28 }}>
          <a className="brownText" href="https://commonwealth.im/dashboard/global">
            Commonwealth
          </a>{' '}
          integration pending
        </div>
      </div>
    </div>
  );
}

export default Symposium;
