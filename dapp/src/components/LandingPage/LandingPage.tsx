import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPrograms, IProgram } from '../../api';

// import communityDescription from '../../logo/communityDescription.svg';
// import innovationDescription from '../../logo/innovationDescription.svg';
// import learningDescripton from '../../logo/learningDescription.svg';
import ourVisionBanner from '../../logo/ourVisionBanner.svg';
// import securityDescription from '../../logo/securityDescription.svg';
import visitAlexandriaBanner from '../../logo/visitAlexandriaBanner.svg';
import nftLogo from '../../logo/nft.svg';
import CourseCard from '../common/CourseCard';
import './LandingPage.css';

function LandingPage() {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const loadProgram = async () => {
    const programs = await getAllPrograms();
    setPrograms(programs);
  };

  useEffect(() => {
    loadProgram();
  }, []);

  return (
    <div className="landingPage">
      <div className="visitAlexandriaBanner">
        <img src={visitAlexandriaBanner} />
        <div className="visitAlexandriabannerHeading">
          <text>Rewarding.</text>
          <text>Accessible.</text>
          <text>Decentralised.</text>
        </div>
        <div className="visitAlexandriabannerSubheading">
          <text>
            Alexandria, where knowledge knows no bounds
          </text>
        </div>
        {/* <Button
          className="visitAlexandriabannerButton"
          onClick={() => window.scrollTo(0, 0)}
          component={Link}
          to="/browse-courses"
        >
          <div className="visitAlexandriaBannerTextInButton">Visit Alexandria</div>
        </Button> */}
        <div className="visitAlexandriabannerScroll">Scroll Down</div>
      </div>

      <div className="ourVisionBanner">
        <img src={ourVisionBanner} />
        <div className="ourVisionContainer">
          <div className="ourVisionTitle">
            Our <text className="brownColor">Vision</text>
          </div>
          <div>
            <div className="ourVisionContent">
              Our vision for Alexandria is to empower individuals by providing them with a platform
              to learn about cryptocurrencies, blockchain technology, and other related subjects,
              while also offering them a practical way to earn digital assets.
            </div>
            <div className="ourVisionContent">
              Education is the foundation of progress, and we believe that by merging education and
              cryptocurrency rewards, we can foster a more inclusive and prosperous global
              community.
            </div>
          </div>
        </div>
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
            principles of accessibility and transparency.
          </text>
        </div>
        <div className="courseCards">
          {programs &&
            programs.map((p) => {
              return <CourseCard key={'card-' + p.cid} program={p} />;
            })}
        </div>
      </div>
      <Button
        className="takeCourse"
        onClick={() => window.scrollTo(0, 0)}
        component={Link}
        to="/browse-courses"
        style={{ textTransform: 'none' }}
      >
        <div className="takeCourseText">Take Course</div>
      </Button>
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
    if (newSection !== null) {
      // Only update the selected section if a new section was selected
      setSelectedSection(newSection);
    }
  };

  const learningSection = (
    <div className="functionContainer">
      <img src={nftLogo} />
      <div className="functionContentContainer">
        <div className="functionTitle">
          Learning Made <text className="brownColor">Rewarding</text>
        </div>
        <div className="functionContent">
          Unlike traditional education platforms, Alexandria goes beyond merely providing knowledge;
          we make learning rewarding. Students who complete courses and pass associated quizzes will
          receive tokens or non-fungible tokens (NFTs) as a token of appreciation for their
          dedication to expanding their understanding of the crypto landscape. These tokens and NFTs
          can be utilized within the platform or traded on various supported exchanges.
        </div>
      </div>
    </div>
  );

  const communitySection = (
    <div className="functionContainer">
      <img src={nftLogo} />
      <div className="functionContentContainer">
        <div className="functionTitle">
          Fostering Community <text className="brownColor">Collaboration</text>
        </div>
        <div className="functionContent">
          At Alexandria, community collaboration is at the core of our ethos. We encourage
          interaction and engagement among students, knowledge providers, and other platform
          participants through discussion forums, interactive Q&A sessions, and live webinars with
          industry experts. Our aim is to create a vibrant and dynamic ecosystem where learning
          becomes a shared experience.
        </div>
      </div>
    </div>
  );

  const securitySection = (
    <div className="functionContainer">
      <img src={nftLogo} />
      <div className="functionContentContainer">
        <div className="functionTitle">
          Security and <text className="brownColor">Trust</text>
        </div>
        <div className="functionContent">
          We understand that security is paramount in the crypto space. Therefore, we employ
          cutting-edge blockchain technology to ensure the integrity of student achievements and
          token rewards. By leveraging the immutability of distributed ledger technology, Alexandria
          guarantees that each earned token or NFT is verifiable and owned solely by the rightful
          recipient.
        </div>
      </div>
    </div>
  );

  // const innovationSection = (
  //   <div className="functionContainer">
  //     <img src={nftLogo} />
  //     <div className="functionContentContainer">
  //       <div className="functionTitle">
  //         Embracing <text className="brownColor">Innovation</text>
  //       </div>
  //       <div className="functionContent">
  //         The world of cryptocurrencies is constantly evolving, and we are committed to staying at
  //         the forefront of innovation. As new trends emerge, Alexandria will adapt and integrate
  //         novel features to provide an unparalleled learning experience for our community.
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderSection = () => {
    const sections = {
      [FunctionIntroductionBarType.learning]: learningSection,
      [FunctionIntroductionBarType.community]: communitySection,
      [FunctionIntroductionBarType.security]: securitySection,
      // [FunctionIntroductionBarType.innovation]: innovationSection,
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
        {/* <ToggleButton
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
        </ToggleButton> */}
      </ToggleButtonGroup>
      <div className="introductionContent">{renderSection()}</div>
    </div>
  );
}
export default LandingPage;
