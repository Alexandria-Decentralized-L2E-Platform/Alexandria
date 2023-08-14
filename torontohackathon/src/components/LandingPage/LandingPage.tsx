import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
import { Button } from '@mui/material';
import { useState } from 'react';
import communityDescription from '../../logo/communityDescription.svg';
import discord from '../../logo/discord.svg';
import earnTokenIcon from '../../logo/earnTokenIcon.svg';
import ellipse from '../../logo/ellipse2.svg';
import footerAlexandria from '../../logo/footerAlexandria.svg';
import innovationDescription from '../../logo/innovationDescription.svg';
import learningDescripton from '../../logo/learningDescription.svg';
import metaMaskLogo from '../../logo/metaMaskLogo.svg';
import ourVisionBanner from '../../logo/ourVisionBanner.svg';
import securityDescription from '../../logo/securityDescription.svg';
import star1 from '../../logo/star1.svg';
import star2 from '../../logo/star2.svg';
import star3 from '../../logo/star3.svg';
import telegram from '../../logo/telegram.svg';
import twitter from '../../logo/twitter.svg';
import visitAlexandriaBanner from '../../logo/visitAlexandriaBanner.svg';
import './LandingPage.css';
// type courseCardprops = {
//   icon: string;
//   name: string;
//   progress: string;
//   rating: number;
//   duration: number;
//   publisher: string;
//   tag: string[];
//   description: string;
//   earning: number;
//   totalToken: number;
// };

function LandingPage() {
  const courseCards: JSX.Element[] = [courseCard(), courseCard(), courseCard(), courseCard()];
  return (
    <div className="landingPage">
      <div className="visitAlexandriaBanner">
        <img src={visitAlexandriaBanner} />
        <div className="visitAlexandriabannerHeading">
          <text>Accessible.</text>
          <text>Transparent.</text>
          <text>Decentralized.</text>
        </div>
        <div className="visitAlexandriabannerSubheading">
          <text>
            Alexandria is a decentralized community driven, self-service platform operation on the
            principles of accessibility and transparency
          </text>
        </div>
        <button className="visitAlexandriabannerButton">
          <div className="visitAlexandriaBannerTextInButton">Visit Alexandria</div>
        </button>
      </div>

      <div className="ourVisionBanner">
        <img src={ourVisionBanner} />
      </div>

      <div className="whatIsAlexandriaContainer">
        <div className="whatIsAlexandria">
          What is&nbsp;<span className="AlexandriaIn-whatIsAlexandria"> Alexandria</span>
        </div>
        <div className="shortIntroAlexandria">
          Alexandria is a decentralized community driven, self-service platform operating on the
          principles of accessibility and transparency
        </div>
        <div style={{ marginTop: '49px' }}>
          <FunctionIntroductionBar />
        </div>
      </div>

      <div className="ourCoursesSection">
        <div className="ourCoursesHeading">
          <div className="ourCoursesText">
            Our&nbsp;<span className="courses-in-ourCourses">Courses</span>
          </div>
          <text className="ourCoursesLongText">
            Alexandria is a decentralized community driven, self-service platform operating on the
            principles of accessibility and transparency
          </text>
        </div>
        <div className="courseCard">{courseCards}</div>
      </div>
      <Button className="takeCourse">
        <text className="takeCourseText">Take Course</text>
      </Button>

      <div className="Footer">
        <div className="FooterRight">
          <img src={footerAlexandria} className="FooterAlexandria" />
          <text className="FooterRightsReserved">@ 2023 Alexandria Team. All Rights Reserved</text>
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
  );
}

function courseCard() {
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

function FunctionIntroductionBar() {
  enum FunctionIntroductionBarType {
    learning = 'learning',
    community = 'community',
    security = 'security',
    innovation = 'innovation',
  }

  const [selectedSection, setSelectedSection] = useState<FunctionIntroductionBarType>(
    FunctionIntroductionBarType.learning,
  );

  const handleSection = (e, newSection) => {
    console.log('newSection', e, newSection);
    if (newSection !== null) {
      // Only update the selected section if a new section was selected
      setSelectedSection(newSection);
    }
  };

  const learningSection = (
    <div>
      <img src={learningDescripton} />
    </div>
  );

  const communitySection = (
    <div>
      <img src={communityDescription} />
    </div>
  );

  const securitySection = (
    <div>
      <img src={securityDescription} />
    </div>
  );

  const innovationSection = (
    <div>
      <img src={innovationDescription} />
    </div>
  );

  const renderSection = () => {
    const sections = {
      [FunctionIntroductionBarType.learning]: learningSection,
      [FunctionIntroductionBarType.community]: communitySection,
      [FunctionIntroductionBarType.security]: securitySection,
      [FunctionIntroductionBarType.innovation]: innovationSection,
    };

    return <div className="active">{sections[selectedSection]}</div>;
  };

  return (
    <div>
      <ToggleButtonGroup
        value={selectedSection}
        exclusive
        onChange={handleSection}
        className="selectSection"
      >
        <ToggleButton
          value={FunctionIntroductionBarType.learning}
          className={
            selectedSection === FunctionIntroductionBarType.learning
              ? 'selectedSectionButton'
              : 'SectionButton'
          }
        >
          <div
            className={
              selectedSection === FunctionIntroductionBarType.learning
                ? 'selectedSectionButtonText'
                : 'SectionButtonText'
            }
          >
            Learning
          </div>{' '}
        </ToggleButton>
        <ToggleButton
          value={FunctionIntroductionBarType.community}
          className={
            selectedSection === FunctionIntroductionBarType.community
              ? 'selectedSectionButton'
              : 'SectionButton'
          }
        >
          <div
            className={
              selectedSection === FunctionIntroductionBarType.community
                ? 'selectedSectionButtonText'
                : 'SectionButtonText'
            }
          >
            Community
          </div>{' '}
        </ToggleButton>
        <ToggleButton
          value={FunctionIntroductionBarType.security}
          className={
            selectedSection === FunctionIntroductionBarType.security
              ? 'selectedSectionButton'
              : 'SectionButton'
          }
        >
          <div
            className={
              selectedSection === FunctionIntroductionBarType.security
                ? 'selectedSectionButtonText'
                : 'SectionButtonText'
            }
          >
            Security
          </div>{' '}
        </ToggleButton>
        <ToggleButton
          value={FunctionIntroductionBarType.innovation}
          className={
            selectedSection === FunctionIntroductionBarType.innovation
              ? 'selectedSectionButton'
              : 'SectionButton'
          }
        >
          <div
            className={
              selectedSection === FunctionIntroductionBarType.innovation
                ? 'selectedSectionButtonText'
                : 'SectionButtonText'
            }
          >
            Innovation
          </div>{' '}
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="introductionContent">{renderSection()}</div>
    </div>
  );
}
export default LandingPage;
