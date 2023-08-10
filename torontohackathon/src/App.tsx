import { AppBar, Button, Toolbar } from '@mui/material';
import './App.css';
import alexandrialLogo from './logo/alexandriaLogo.svg';
import alexandriaName from './logo/alexandriaName.svg';
import iconsWallet from './logo/iconsWallet.svg';

import { ethers } from 'ethers';
import { loadProvider, isConnected, connect } from './api/blockchain/index';
import { getTokenBalance } from './api/contracts';
import { useEffect } from 'react';

function App() {
  let provider: ethers.providers.Web3Provider | undefined;
  useEffect(() => {
    isConnected();
    provider = loadProvider();
    if (provider) getTokenBalance(provider, '0x75e11567d3AfA9650d8BA16fE58eae425B030c24');
  });

  return (
    <div className="App">
      <AppBar
        position="sticky"
        sx={{
          borderRadius: '0px 0px 30px 30px',
          backgroundColor: '#232221',
          height: '97px',
          flexShrink: 0,
          width: '100%',
        }}
      >
        <Toolbar>
          <div className="alexandria-whole-tab">
            <div className="alexandria-logoAndName">
              <img src={alexandrialLogo} className="alexandria-logo" />
              <img src={alexandriaName} className="alexandria-name" />
            </div>
            <div className="alexandria-rightHandSide-tab">
              <div className="alexandria-typography">
                <Button className="alexandria-header-tab" color="inherit">
                  Browse Courses
                </Button>
                <Button className="alexandria-header-tab" color="inherit">
                  Symposium
                </Button>
                <Button className="alexandria-header-tab" color="inherit">
                  Governance
                </Button>
                <Button className="alexandria-header-tab" color="inherit">
                  My Certificates
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (provider) connect(provider);
                }}
                sx={{
                  padding: 0, // Remove padding to make the div look like the actual button
                  textTransform: 'none',
                }}
                color="inherit"
              >
                <div className="alexandria-connectWallet">
                  <img src={iconsWallet} />
                  <div className="alexandria-connectWallet-text">Connect Wallet</div>
                </div>
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
