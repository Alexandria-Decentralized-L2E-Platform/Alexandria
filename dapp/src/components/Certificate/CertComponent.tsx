import React from 'react';
import { ICert } from '../../api';

//full
// import starFull from '../../logo/star1.svg';
// // //half
// import starHalf from '../../logo/star2.svg';
// // //empty
// import starEmpty from '../../logo/star3.svg';

import dummy from '../../logo/nft.svg';
import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 700,
    width: 700,
    height: 280,
    padding: 0,
    backgroundColor: '#EDEBE8',
    borderRadius: 10,
  },
});

function Stars(props: { avg: number }) {
  const avg = props.avg;
  return <>{avg}</>;
}

function CertDetail(props: { cert: ICert }) {
  const cert = props.cert;
  return (
    <div className="certDetail">
      <div className="certHeading">
        <div className="certTitle">{cert.title}</div>
        <div>
          <Stars avg={cert.rating.avg} />
        </div>
        <div>{cert.duration}</div>
        <div>By {cert.authorName}</div>
      </div>
      <div className="certContent">
        <div className="certTags">
          <div className="tag brownBg">{cert.topic}</div>
          <div className="tag blueBg">{cert.type}</div>
        </div>
        <div>Completion Date: {cert.completionDate}</div>
        <div>Link to Course Material: {cert.link}</div>
        <div>Certification Address: {cert.certificate}</div>
        <div>Publisher Address: {cert.owner}</div>
      </div>
    </div>
  );
}

function CertComponent(props: { cert: ICert }) {
  const cert = props.cert;
  return (
    <div>
      {/* Image */}
      <CustomTooltip
        className="certDetail"
        title={
          <React.Fragment>
            <CertDetail cert={cert} />
          </React.Fragment>
        }
      >
        <img className="certLogo" src={dummy}></img>
      </CustomTooltip>
      <div style={{ fontSize: 20, marginTop: 5 }}>{cert.title}</div>
    </div>
  );
}

export default CertComponent;
