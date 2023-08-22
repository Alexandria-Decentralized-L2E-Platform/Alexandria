import React from 'react';
import { ICert } from '../../api';

//full
import starFullWhite from '../../logo/starFullWhite.svg';
// // //half
import starHalfWhite from '../../logo/starHalfWhite.svg';
// // //empty
import starEmptyWhite from '../../logo/starEmptyWhite.svg';

// import dummy from '../../logo/nft.svg';
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
  let avg = Math.round(props.avg * 2) / 2;
  const arr: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (avg > 0.5) {
      arr.push(<img src={starFullWhite} />);
    } else if (avg > 0) {
      arr.push(<img src={starHalfWhite} />);
    } else {
      arr.push(<img src={starEmptyWhite} />);
    }
    avg -= 1;
  }
  return <div style={{ display: 'flex', justifyContent: 'center' }}>{arr}</div>;
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
        <div style={{ fontSize: 12 }}>{cert.duration}</div>
        <div style={{ fontSize: 12 }}>
          {'By ' + cert.owner.substring(0, 4) + '...' + cert.owner.substring(cert.owner.length - 4)}
        </div>
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
  const imgLink =
    'https://img.youtube.com/vi/' +
    cert.link.substring(cert.link.indexOf('watch?v=') + 8) +
    '/sddefault.jpg';
  return (
    <div className="certComponentConatiner">
      {/* Image */}
      <div className="certLogoContainer">
        <CustomTooltip
          className="certDetail"
          title={
            <React.Fragment>
              <CertDetail cert={cert} />
            </React.Fragment>
          }
        >
          <img className="certLogo" src={imgLink}></img>
        </CustomTooltip>
      </div>
      <div style={{ fontSize: 20, marginTop: 5 }}>{cert.title}</div>
    </div>
  );
}

export default CertComponent;
