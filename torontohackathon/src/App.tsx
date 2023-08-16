// Pacakge
import { AppBar, Button, Toolbar } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { connect, isConnected, setupWallet, walletAddress, walletProvider } from './api/blockchain';
import { ICard, doMint, getLibraryCardDetail, hasLibraryCard } from './api/contracts';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CourseCatalogue from './components/CourseCatalogue/CourseCatalogue';
// CSS
import './App.css';

// Components
// import CourseDetail from './components/CourseDetail/CourseDetail';
import LandingPage from './components/LandingPage/LandingPage';

// Image
import alexandriaLogo from './logo/alexandriaLogo.svg';
import alexandriaName from './logo/alexandriaName.svg';
import discord from './logo/discord.svg';
import footerAlexandria from './logo/footerAlexandria.svg';
import iconsWallet from './logo/iconsWallet.svg';
import telegram from './logo/telegram.svg';
import twitter from './logo/twitter.svg';

function App() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [userAddress, setUserAddress] = useState('');
  const [hasCard, setHasCard] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [isCardShown, setIsCardShown] = useState(false);
  const [card, setCard] = useState<ICard | undefined>(undefined);
  function shortenAddress(address: string) {
    if (!address || address.length < 10) return '';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }

  async function setupPage() {
    await setupWallet();
    setProvider(walletProvider);
    updateUserAddress();
    if (isConnected() && provider) {
      setIsConnect(true);
      const hasLibCard = await hasLibraryCard(provider);
      setHasCard(hasLibCard);
      if (hasCard) setCard(await getLibraryCardDetail(provider));
      // walletProvider.on('connect', () => {
      //   console.log('connect');
      // });
      // walletProvider.on('accountsChanged', () => {
      //   console.log('account changed');
      // });
    }
  }

  async function connectWallet() {
    await connect();
    updateUserAddress();
  }

  useEffect(() => {
    setupPage();
  }, [userAddress]);

  const onClickWalletHandler = async () => {
    if (!userAddress) {
      connectWallet();
    } else {
      setIsCardShown(!isCardShown);
    }
  };

  function updateUserAddress() {
    if (!walletAddress) return;
    const x = walletAddress;
    setUserAddress(shortenAddress(x));
  }

  return (
    <Router>
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
                <img src={alexandriaLogo} className="alexandria-logo" />
                <img src={alexandriaName} className="alexandria-name" />
              </div>
              <div className="alexandria-rightHandSide-tab">
                <div className="alexandria-typography">
                  <Button
                    className="alexandria-header-tab"
                    color="inherit"
                    component={Link}
                    to="/browse-courses"
                  >
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
                  onClick={onClickWalletHandler}
                  sx={{
                    padding: 0, // Remove padding to make the div look like the actual button
                    textTransform: 'none',
                  }}
                  color="inherit"
                >
                  <div className="alexandria-connectWallet">
                    <img src={iconsWallet} />
                    {!userAddress ? (
                      <div id="connectWalletText" className="alexandria-connectWallet-text">
                        Connect Wallet
                      </div>
                    ) : (
                      <div id="userAddress">{userAddress}</div>
                    )}
                    {isConnect && isCardShown && (
                      <div className="library-card">
                        <div className="library-card-header">
                          <img
                            src={alexandriaLogo}
                            className="alexandria-logo, library-card-header-logo"
                          />
                          <p className="library-card-header-app">ALEXANDRIA</p>
                          <p className="library-card-header-name">LIBRARY CARD</p>
                        </div>
                        {hasCard && card ? (
                          <div className="library-card-main">
                            <div className="library-card-main-pic">
                              <img
                                src={alexandriaLogo}
                                className="alexandria-logo, library-card-main-logo"
                              />
                            </div>
                            <div className="library-card-main-col">
                              <p>Card ID:</p>
                              <p>Member:</p>
                              <p>Member Since:</p>
                              <p>Card Address:</p>
                            </div>
                            <div className="library-card-main-data">
                              <p>{card.tokenId}</p>
                              <p>{card.userAddress}</p>
                              <p>{card.mintedAt}</p>
                              <p>{card.contractAddress}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="library-card-main">
                            <h2> Get Your Library Card</h2>
                            <div
                              onClick={() => {
                                if (provider) doMint(provider);
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/browse-courses"
            element={provider ? <CourseCatalogue provider={provider} /> : null}
          />
          <Route path="/" element={provider ? <LandingPage provider={provider} /> : null} />
        </Routes>
        <div className="Footer">
          <div className="FooterRight">
            <img src={footerAlexandria} className="FooterAlexandria" />
            <p className="FooterRightsReserved">@ 2023 Alexandria Team. All Rights Reserved</p>
            <div className="FooterSocialMedia">
              <Button className="FooterSocialMediaIcon">
                <img src={twitter} />
              </Button>
              <Button className="FooterSocialMediaIcon">
                <img src={discord} />
              </Button>
              <Button className="FooterSocialMediaIcon">
                <img src={telegram} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
