import { getAllPrograms, IProgram } from '../../api';
import { walletProvider } from '../../api/blockchain';
import { useEffect, useState } from 'react';

import Question from './Question';
import './CourseDetail.css';

function CourseDetail() {
  const [program, setProgram] = useState<IProgram | undefined>(undefined);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);

  const loadProgram = async () => {
    setProgram((await getAllPrograms(walletProvider))[0]);
    console.log(program);
  };

  useEffect(() => {
    loadProgram();
    console.log(program);
  }, []);

  return (
    <div className="Coures-Detail">
      {program ? (
        <div className="Course-Detail-Wrapper">
          <div className="info-bar">
            <p className="info-bar-browse">{'Browse Courses >'}</p>
            <p className="info-bar-title">{program.title}</p>
          </div>
          {/*<CourseBanner></CourseBanner> */}
          <div className="reward-Progress"></div>
          <div className="video-responsive">
            <iframe
              width="100%"
              height="550"
              src={
                'https://www.youtube.com/embed/' +
                program.link.substring(program.link.indexOf('watch?v=') + 8)
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <div className="Questions">
            <p>Select the correct answer.</p>
            {program.questions.map((v, i) => {
              return <Question key={v.title} data={{ ...v, number: i + 1 }}></Question>;
            })}
          </div>
          <button className="Quiz-Button">{isTakingQuiz ? 'Submit Quiz' : 'Take Quiz'}</button>
        </div>
      ) : (
        <div className="Course-Detail-Wrapper"></div>
      )}
    </div>
  );
}

export default CourseDetail;
