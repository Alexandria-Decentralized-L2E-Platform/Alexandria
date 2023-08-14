import { Button } from '@mui/material';

import './CourseCard.css';

import star1 from '../../logo/star1.svg';
import star2 from '../../logo/star2.svg';
import star3 from '../../logo/star3.svg';
import earnTokenIcon from '../../logo/earnTokenIcon.svg';
import ellipse from '../../logo/ellipse2.svg';
import metaMaskLogo from '../../logo/metaMaskLogo.svg';

function CourseCard() {
  const earnTokenNumber = 200;
  const totalTokenNumber = 20000;
  const courseName = 'MetaMask 101';
  const courseStatus = 'In Progress';
  const courseDescription =
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex....';
  let rating = 3.5;
  const courseDuration = '1h 30m';
  const coursePublisher = 'By Mouse Mouse 78';

  const ratingStars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      ratingStars.push(<img src={star1} className="CourseRatingStar" />);
      rating--;
    } else if (rating >= 0.5) {
      ratingStars.push(<img src={star2} className="CourseRatingStar" />);
      rating -= 0.5;
    } else {
      ratingStars.push(<img src={star3} className="CourseRatingStar" />);
    }
  }

  const video: JSX.Element = (
    <div className="CourseTagVideo">
      <div className="CourseTagText">Video</div>
    </div>
  );
  const crosschainInfrastructure: JSX.Element = (
    <div className="CourseTagCrossChain">
      <div className="CourseTagText">Crosschain Infrastructure</div>
    </div>
  );

  const courseTags: JSX.Element[] = [video, crosschainInfrastructure];
  return (
    <div className="courseCard">
      <div className="innerCourseCard">
        <div className="innerCourseCardLeft">
          <div className="innerCourseCardLeftLeft">
            <div className="innerCourseCardSvgFrame">
              <img src={metaMaskLogo} className="innerCourseCardSvg" />
            </div>
          </div>

          <div className="innerCourseCardLeftRight">
            <div className="CourseDetail">
              <div className="CourseTitle">
                <text className="CourseName">{courseName}</text>
                <div className="CourseStatus">
                  <img src={ellipse} className="CourseStatusIcon" />
                  <text className="CourseStatusText">{courseStatus}</text>
                </div>
              </div>
              <div className="Course-Rating-Duration-Publisher">
                <div className="CourseRating">{ratingStars}</div>
                <div className="CourseDuration">{courseDuration}</div>
                <div className="CoursePublisher">{coursePublisher}</div>
              </div>
              <div className="CourseTag">{courseTags}</div>
              <div className="CourseDescription">
                <text>{courseDescription}</text>
              </div>
            </div>
          </div>
        </div>
        <div className="innerCourseCardRight">
          <Button
            className="courseEarnToken"
            color="inherit"
            sx={{
              textTransform: 'none',
            }}
          >
            <div className="courseEarnTokenIconAndText">
              <img src={earnTokenIcon} className="courseEarnTokenIcon" />
              <text className="courseEarnTokenText">Earn {earnTokenNumber} Token</text>
            </div>
          </Button>
          <text className="courseTotalToken">Total: {totalTokenNumber} Tokens</text>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;