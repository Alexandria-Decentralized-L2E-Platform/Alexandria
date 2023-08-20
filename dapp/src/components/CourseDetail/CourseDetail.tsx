import { IProgram, contracts, getProgramById } from '../../api';
import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';

import Question from './Question';
import CourseCard from '../common/CourseCard';
import './CourseDetail.css';
import { useParams } from 'react-router-dom';
import { doMint, hasLibraryCard } from '../../api/contracts';

function CourseDetail(props: { provider: ethers.providers.Web3Provider }) {
  const { id } = useParams();
  const [answer, setAnswer] = useState({});
  const [program, setProgram] = useState<IProgram | undefined>(undefined);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasCard, setHasCaed] = useState<boolean>(false);

  const loadProgram = async () => {
    if (!id) return;
    const program = await getProgramById(props.provider, Number(id));
    setProgram(program);
    const hasCard = await hasLibraryCard(props.provider);
    setHasCaed(hasCard);
  };

  const onSelectAnswer = async (i: number, choice: string) => {
    const newAnswer = {
      ...answer,
      [i]: choice,
    };
    setAnswer(newAnswer);
  };

  const onClickHandler = async () => {
    if (!hasCard) {
      await doMint(props.provider);
      const hasCard = await hasLibraryCard(props.provider);
      setHasCaed(hasCard);
    }
    if (isTakingQuiz && program) {
      // Convert answer object to answer[]
      const answerArr: string[] = Object.values(answer);

      // Check Answer
      const isCorrect =
        answerArr.length == program.questions.length &&
        (await contracts.checkAnswer(props.provider, program.id.toNumber(), answerArr));

      if (isCorrect) {
        setIsCorrect(true);
        contracts.learnProgram(props.provider, program.id.toNumber(), answerArr);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsTakingQuiz(true);
    }
  };

  useEffect(() => {
    loadProgram();
  }, []);

  return (
    <div className="Coures-Detail">
      {program ? (
        <div className="Course-Detail-Wrapper">
          <div className="info-bar">
            <p className="info-bar-browse">{'Browse Courses >'}</p>
            <p className="info-bar-title">{program.title}</p>
          </div>
          <CourseCard program={program} isDetail={true}></CourseCard>
          <div className="Reward-Progress">
            <div className="Reward-Progress-Title">
              <p>Reward Distributed:</p>
              <p>
                {program.reward.rewardDistributed +
                  '/' +
                  BigNumber.from(program.reward.rewardAddressCap).mul(
                    program.reward.rewardPerAddress,
                  ) +
                  ' ' +
                  program.reward.tokenSymbol}
              </p>
            </div>
            <div className="Progress-Bar-Container">
              <div
                className="Progress-Bar-Filler"
                style={{
                  width:
                    Math.round(
                      BigNumber.from(program.reward.rewardDistributed)
                        .div(
                          BigNumber.from(program.reward.rewardAddressCap).mul(
                            program.reward.rewardPerAddress,
                          ),
                        )
                        .toNumber(),
                    ) + '%',
                }}
              ></div>
            </div>
          </div>
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
          {isTakingQuiz ? (
            <div className="Questions">
              <p>Select the correct answer.</p>
              {program.questions.map((v, i) => {
                return (
                  <Question key={v.title} data={{ ...v, number: i + 1, onSelectAnswer }}></Question>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
          {isCorrect == false ? (
            <p className="Error-Message">Submitted answer is incorrect. Please try again.</p>
          ) : (
            <div></div>
          )}
          <button className="Quiz-Button" onClick={onClickHandler}>
            {hasCard ? (isTakingQuiz ? 'Submit Quiz' : 'Take Quiz') : 'Get Library Card'}
          </button>
          <p className="Question-Reward">
            {'Reward ' + program.reward.rewardPerAddress + ' ' + program.reward.tokenSymbol}
          </p>
        </div>
      ) : (
        <div className="Course-Detail-Wrapper"></div>
      )}
    </div>
  );
}

export default CourseDetail;
