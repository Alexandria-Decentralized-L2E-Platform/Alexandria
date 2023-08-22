import { Button } from '@mui/material';
import { IProgram } from '../../api';
import { BigNumber } from 'ethers';
import { Link } from 'react-router-dom';

import star1 from '../../logo/star1.svg';
import star2 from '../../logo/star2.svg';
import star3 from '../../logo/star3.svg';
import earnTokenIcon from '../../logo/earnTokenIcon.svg';
import ellipse from '../../logo/ellipse2.svg';

import './CourseCard.css';
import React from 'react';

function CourseCard(props: { program: IProgram; isDetail?: boolean }) {
  const program = props.program;
  const earnTokenNumber = program.reward.rewardPerAddress;
  const totalTokenNumber = BigNumber.from(program.reward.rewardPerAddress)
    .mul(BigNumber.from(program.reward.rewardAddressCap))
    .toString();
  const courseName =
    program.title.length < 30 || props.isDetail
      ? program.title
      : program.title.substring(0, 30) + '...';
  const courseStatus =
    program.reward.rewardAddressCap == '0' || program.reward.rewardRemaining == '0'
      ? ' Certificate Only'
      : 'Rewards & Certificate';
  const courseDescription =
    program.description.length < 200 || props.isDetail
      ? program.description
      : program.description.substring(0, 200) + '...';
  let rating = program.rating.avg;
  // Covert duration from number (mins) to string
  const courseDuration: string = program.duration;
  const coursePublisher = props.isDetail
    ? 'By ' + program.owner + ''
    : 'By ' +
      program.owner.substring(0, 4) +
      '...' +
      program.owner.substring(program.owner.length - 4);
  const type = program.type;
  const tag = program.topic;
  const imgLink =
    'https://img.youtube.com/vi/' +
    program.link.substring(program.link.indexOf('watch?v=') + 8) +
    '/sddefault.jpg';

  const ratingStars: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      ratingStars.push(
        <img key={'star-' + program.cid + '-' + i} src={star1} className="CourseRatingStar" />,
      );
      rating--;
    } else if (rating >= 0.5) {
      ratingStars.push(
        <img key={'star-' + program.cid + '-' + i} src={star2} className="CourseRatingStar" />,
      );
      rating -= 0.5;
    } else {
      ratingStars.push(
        <img key={'star-' + program.cid + '-' + i} src={star3} className="CourseRatingStar" />,
      );
    }
  }
  ratingStars.push(
    <p key={'text-' + program.cid} className="CourseRatingCount">
      {'(' + program.rating.count + ')'}
    </p>,
  );

  const video: JSX.Element = (
    <div key="type" className="CourseTagVideo">
      <div className="CourseTagText">{type}</div>
    </div>
  );
  const crosschainInfrastructure: JSX.Element = (
    <div key="topic" className="CourseTagCrossChain">
      <div className="CourseTagText">{tag}</div>
    </div>
  );

  const courseTags: JSX.Element[] = [video, crosschainInfrastructure];
  return (
    <div className="courseCard">
      <div className="innerCourseCard">
        <div className="innerCourseCardLeft">
          {!props.isDetail && <img src={imgLink} className="innerCourseCardSvg" />}
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
        {!props.isDetail && (
          <div className="innerCourseCardRight">
            <Button
              className="courseEarnToken"
              color="inherit"
              sx={{
                textTransform: 'none',
              }}
              onClick={() => window.scrollTo(0, 0)}
              component={Link}
              to={'/browse-detail/' + program.id}
            >
              <div className="courseEarnTokenIconAndText">
                <img src={earnTokenIcon} className="courseEarnTokenIcon" />
                <text className="courseEarnTokenText">
                  Earn {earnTokenNumber} {program.reward.tokenSymbol}
                </text>
              </div>
            </Button>
            <text className="courseTotalToken">
              Total: {totalTokenNumber} {program.reward.tokenSymbol}
            </text>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
