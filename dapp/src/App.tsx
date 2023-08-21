// Pacakge
import { AppBar, Button, Toolbar } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { connect } from './api/blockchain';
import { ICard, doMint, getLibraryCardDetail, hasLibraryCard } from './api/contracts';

import CourseCatalogue from './components/CourseCatalogue/CourseCatalogue';
// CSS
import './App.css';

// Components
import CourseDetail from './components/CourseDetail/CourseDetail';
import LandingPage from './components/LandingPage/LandingPage';

// Image
import alexandriaLogo from './logo/alexandriaLogo.svg';
import alexandriaName from './logo/alexandriaName.svg';
import discord from './logo/discord.svg';
import footerAlexandria from './logo/footerAlexandria.svg';
import iconsWallet from './logo/iconsWallet.svg';
import libraryCardAlexandria from './logo/libraryCardAlexandria.svg';
import telegram from './logo/telegram.svg';
import twitter from './logo/twitter.svg';
function App() {
  const [provider] = useState<ethers.providers.Web3Provider | undefined>(
    window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : undefined,
  );
  const [, setChainId] = useState<number>(0);
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
    // Setup wallet
    if (!window.ethereum) return;
    if (!provider) return;
    const accounts = await provider.listAccounts();
    if (accounts.length == 0) {
      setIsConnect(false);
    } else {
      setIsConnect(true);
    }
    setChainId((await provider.getNetwork()).chainId);
    if (isConnect) {
      setUserAddress(accounts[0]);
      const hasLibCard = await hasLibraryCard(provider);
      setHasCard(hasLibCard);
      if (hasCard) setCard(await getLibraryCardDetail(provider));
    }
  }

  async function connectWallet() {
    if (provider) {
      setUserAddress(await connect(provider));
      const accounts = await provider.listAccounts();
      if (accounts.length == 0) {
        setIsConnect(false);
      } else {
        setIsConnect(true);
      }
      if (isConnect) {
        setUserAddress(accounts[0]);
        const hasLibCard = await hasLibraryCard(provider);
        setHasCard(hasLibCard);
        if (hasCard) setCard(await getLibraryCardDetail(provider));
      }
    }
  }

  useEffect(() => {
    setupPage();
  }, [isConnect, hasCard]);

  const onClickWalletHandler = async () => {
    if (!userAddress) {
      connectWallet();
    } else {
      setIsCardShown((prevState) => !prevState);
    }
  };

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
              <Button component={Link} to="/">
                <div className="alexandria-logoAndName">
                  <img src={alexandriaLogo} className="alexandria-logo" />
                  <img src={alexandriaName} className="alexandria-name" />
                </div>
              </Button>
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
                      <div id="userAddress">{shortenAddress(userAddress)}</div>
                    )}
                    {isConnect && isCardShown && (
                      <div className="library-card">
                        <div className="library-card-header">
                          <img src={alexandriaLogo} className="library-card-header-logo" />
                          <img
                            src={libraryCardAlexandria}
                            className="library-card-header-app"
                          ></img>
                          <p className="library-card-header-name">LIBRARY CARD</p>
                        </div>
                        {hasCard && card ? (
                          <div className="library-card-main-hasCard">
                            <div className="library-card-main-left">
                              <div className="library-card-main-pic">
                                <img src={alexandriaLogo} className="library-card-main-logo" />
                              </div>
                            </div>
                            <div className="library-card-main-right">
                              <div className="library-card-main-right-data">
                                <p className="library-card-main-right-data-title">Card ID:</p>
                                <p className="library-card-main-right-data-entity">sdfsdf</p>
                              </div>

                              <div className="library-card-main-right-data">
                                <p className="library-card-main-right-data-title">Address:</p>
                                <p className="library-card-main-right-data-entity">dsfefdosfho</p>
                              </div>

                              <div className="library-card-main-right-data">
                                <p className="library-card-main-right-data-title">Member Since:</p>
                                <p className="library-card-main-right-data-entity">
                                  13 August 2023
                                </p>
                              </div>

                              <div className="library-card-main-right-data">
                                <p className="library-card-main-right-data-title">Card Address:</p>
                                <p className="library-card-main-right-data-entity">
                                  0xy1i3u1237sdfsdafdsafdsafsdfdsfsdf13123123213
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="library-card-main">
                            <h2 className="library-card-main-text"> Get Your Library Card</h2>
                            <div
                              onClick={() => {
                                if (provider) doMint(provider);
                              }}
                              className="library-card-main-button"
                            >
                              <img src={iconsWallet}></img>
                              <text className="library-card-main-button-text">
                                Mint Your Library Card
                              </text>
                            </div>
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
          <Route path="/browse-courses" element={<CourseCatalogue />} />
          <Route
            path="/browse-detail/:id"
            element={
              <CourseDetail
                key={'CourseDetail'}
                provider={provider}
                isConnect={isConnect}
                hasCard={hasCard}
                setHasCard={setHasCard}
                connectWallet={connectWallet}
              />
            }
          />
          <Route path="/" element={<LandingPage />} />
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
