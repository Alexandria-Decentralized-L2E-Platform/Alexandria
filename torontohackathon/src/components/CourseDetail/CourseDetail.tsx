import { getAllPrograms, IProgram } from '../../api';
import { walletProvider } from '../../api/blockchain';
import { useEffect, useState } from 'react';

import Question from './Question';

function CourseDetail() {
  const [program, setProgram] = useState<IProgram | undefined>(undefined);

  const loadProgram = async () => {
    setProgram((await getAllPrograms(walletProvider))[0]);
    console.log(program);
  };

  useEffect(() => {
    loadProgram();
    console.log(program);
  }, []);

  return (
    <div className="CouresDetail">
      {program ? (
        <div className="CourseDetailWrapper">
          <h3>{'Browse Courses > ' + program.title}</h3>
          {/*<CourseBanner></CourseBanner> */}
          <div className="rewardProgress"></div>
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
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
              return <Question key={v.title} data={{ ...v, number: i }}></Question>;
            })}
          </div>
        </div>
      ) : (
        <div className="CourseDetailWrapper"></div>
      )}
    </div>
  );
}

export default CourseDetail;
