import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { IProgram, contracts, getProgramById } from '../../api';

import CourseCard from '../common/CourseCard';
import Question from './Question';
// import CourseCompleted from './CourseCompleted';
import { useParams } from 'react-router-dom';
import { completedProgramByAddress, doMint, hasLibraryCard } from '../../api/contracts';
import './CourseDetail.css';

function CourseDetail(props: {
  provider: ethers.providers.Web3Provider | undefined;
  isConnect: boolean;
  hasCard: boolean;
  setHasCard(hasCard: boolean): void;
  connectWallet(): void;
}) {
  const { id } = useParams();
  const [answer, setAnswer] = useState({});
  const [program, setProgram] = useState<IProgram | undefined>(undefined);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTaken, setIsTaken] = useState<boolean>(false);

  const setupPage = async () => {
    if (!id) return;
    const program = await getProgramById(Number(id));
    setProgram(program);
    if (props.isConnect && props.provider) {
      const certs = await completedProgramByAddress(props.provider);
      setIsTaken(certs.includes(program.id.toNumber()));
    }
  };

  const onSelectAnswer = async (i: number, choice: string) => {
    const newAnswer = {
      ...answer,
      [i]: choice,
    };
    setAnswer(newAnswer);
  };

  const onClickHandler = async () => {
    if (!window.ethereum) return;
    if (!props.provider) return;
    if (isTaken) return;

    if (!props.isConnect) {
      props.connectWallet();
      return;
    }
    if (!props.hasCard) {
      await doMint(props.provider);
      const hasCard = await hasLibraryCard(props.provider);
      props.setHasCard(hasCard);
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
        const trx = await contracts.learnProgram(props.provider, program.id.toNumber(), answerArr);
        await trx.wait();
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsTakingQuiz(true);
    }
  };

  useEffect(() => {
    setupPage();
  }, [props]);

  return (
    <div className="Coures-Detail">
      {program ? (
        <div className="Course-Detail-Wrapper">
          <div className="info-bar">
            <p className="info-bar-browse">{'Browse Courses >'}</p>
            <p className="info-bar-title">{program.title}</p>
          </div>
          <CourseCard key={'detail-' + program.cid} program={program} isDetail={true}></CourseCard>
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
                        .toNumber() * 100,
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
          <button className="Quiz-Button" disabled={isTaken} onClick={onClickHandler}>
            {props.isConnect
              ? props.hasCard
                ? !isTaken
                  ? isTakingQuiz
                    ? 'Submit Quiz'
                    : 'Take Quiz'
                  : 'Completed'
                : 'Get Library Card'
              : 'Connect Wallet'}
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
