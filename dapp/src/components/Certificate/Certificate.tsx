import '../common/Common.css';
import './Certificate.css';

import { useEffect, useState } from 'react';
import { ICert, getCertsByOwner } from '../../api';
import { ethers } from 'ethers';
import CertComponent from './CertComponent';
import { Button, Grid } from '@mui/material';

import alexandriaLogo from '../../logo/alexandriaLogo.svg';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function EmptyCert() {
  return (
    <div className="emptyCert">
      <img src={alexandriaLogo} width={200}></img>
      <div className="brownText" style={{ fontSize: 28 }}>
        You have not completed any courses yet.
      </div>
      <Button component={Link} to="/browse-courses" className="takeCourse">
        <div className="takeCourseText">Start Learning</div>
      </Button>
    </div>
  );
}

function Certificate(props: { provider: ethers.providers.Web3Provider | undefined }) {
  const [certList, setCertList] = useState<ICert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCert = async () => {
    setIsLoading(true);
    if (!props.provider) return;
    const certs = await getCertsByOwner(props.provider);
    setCertList(certs);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCert();
  }, []);

  return (
    <div className="Container">
      <h1>My Certificates</h1>
      {/* <div className="Search-Bar">
        <input placeholder="Search by Course Name or Course Sponsor"></input>
      </div> */}
      {isLoading ? (
        <CircularProgress style={{ marginTop: '50px' }}></CircularProgress>
      ) : certList.length == 0 ? (
        <EmptyCert />
      ) : (
        <Grid marginTop={2} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {certList.map((cert) => {
            return (
              <Grid item md={2.4} xs={4} key={'cert-' + cert.cid}>
                <CertComponent cert={cert}></CertComponent>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default Certificate;
