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
          <text>Earn, Learn and educate on this brand new decentralized education platform.</text>
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
              Alexandria envisions a future where education is universally accessible, empowering
              every individual to seamlessly transition between the roles of learner and educator.
              Through a decentralized and community-driven platform, we incentivize and elevate the
              pursuit of knowledge, fostering a dynamic exchange that transcends barriers. Our goal
              is to revolutionize education, making it inclusive, engaging, and rewarding, while
              propelling learners and educators alike toward a shared journey of growth and
              collaboration.
            </div>
            {/* <div className="ourVisionContent">
              Our goal is to revolutionize education, making it inclusive, engaging, and rewarding,
              while propelling learners and educators alike toward a shared journey of growth and
            </div> */}
          </div>
        </div>
      </div>

      <div className="whatIsAlexandriaContainer">
        <div className="whatIsAlexandria">
          What is&nbsp;<span className="AlexandriaIn-whatIsAlexandria"> Alexandria</span>
        </div>
        <div className="shortIntroAlexandria">
          Alexandria is a decentralized community driven, self-serviced learning platform operating
          on the principles of accessibility, incentivzation and decentralization.
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
            Alexandria is a decentralized community driven, self-serviced learning platform
            operating on the principles of accessibility, incentivzation and decentralization.
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
        <div className="takeCourseText">Browse Course</div>
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
          New <text className="brownColor">Paradigm</text>
        </div>
        <div className="functionContent">
          Bridging the Gap Between Learners and Educators, Propelling Education into an Era of
          Universal Accessibility. At Alexandria, we empower each individual to seamlessly
          transition between the roles of both learner and educator, creating a dynamic ecosystem
          where knowledge flows freely. This unique approach ensures that education transcends
          barriers, welcoming all to partake in a transformative journey that fosters growth,
          collaboration, and equal opportunity for everyone
        </div>
      </div>
    </div>
  );

  const communitySection = (
    <div className="functionContainer">
      <img src={nftLogo} />
      <div className="functionContentContainer">
        <div className="functionTitle">
          Catalyzing <text className="brownColor">Progress</text>
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
          Decentralizing <text className="brownColor">Education</text>
        </div>
        <div className="functionContent">
          Empowering Minds Through Distributed Learning. Alexandria reimagines education by
          decentralizing the process, granting individuals the autonomy to both learn and teach.
          Through a network that transcends traditional structures, learners become educators and
          educators become learners, fostering a community-driven exchange of knowledge. This
          decentralization democratizes education, eliminating gatekeepers and fostering a dynamic
          ecosystem where information is freely shared, creating an inclusive and collaborative
          learning environment.
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
            Accessibility
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
            Incentivzation
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
            Decentralization
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
