import '../common/Common.css';

import './Certificate.css';

import React, { useEffect, useState } from 'react';
import { ICert } from '../../api';

import CertComponent from './CertComponent';
import { BigNumber } from 'ethers';
import { Button, Grid } from '@mui/material';

// const [certList, setCertList] = useState<ICert[]>([]);
import alexandriaLogo from '../../logo/alexandriaLogo.svg';
import { Link } from 'react-router-dom';

const dummyCert: ICert = {
  completionDate: '13 Jan 2023',
  id: BigNumber.from('1'),
  owner: '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
  authorName: 'Frank',
  title: 'Metamask 101',
  cid: 'cid',
  certificate: '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
  rating: { avg: 3.89, count: 1 },
  reward: {
    rewardToken: 'token',
    rewardAddressCap: 'addCap',
    rewardPerAddress: 'PerAdd',
    rewardDistributed: 'rewardD',
    rewardRemaining: 'remain',
    tokenSymbol: 'symbol',
  },
  description: 'des',
  duration: '100 minutes',
  link: ' https://www.youtube.com/watch?v=YVgfHZMFFFQ',
  topic: 'topic',
  type: 'type',
  questions: [],
};

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

function Certificate() {
  const [certList, setCertList] = useState<ICert[]>([]);

  useEffect(() => {
    setCertList(Array(10).fill(dummyCert));
  }, []);

  return (
    <div className="Container">
      <h1>My Certificates</h1>
      {/* <div className="Search-Bar">
        <input placeholder="Search by Course Name or Course Sponsor"></input>
      </div> */}
      {certList.length == 0 ? (
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
