import { useState, useEffect } from 'react';
import { topic, type, duration, ipfs, contracts, validateData, createProgram } from '../../api';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { getNumberOfPrograms } from '../../api/contracts';
import './CourseCreation.css';

const choices = ['A', 'B', 'C', 'D'];
const defaultQuestion = Array.from({ length: 5 }, () => {
  return {
    title: '',
    choices: Array.from({ length: 4 }, () => ''),
  };
});

function TextInput(props: {
  name: string;
  programKey: string;
  placeholder: string;
  inputType: string;
  onChangeTextInput(key: string, value: string);
}) {
  return (
    <div className="Course-Creation-txt">
      <p>{props.name + ':'}</p>
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        id={props.programKey}
        onChange={(event) => props.onChangeTextInput(props.programKey, event.target.value)}
      />
    </div>
  );
}

function Radios(props: {
  name: string;
  options: string[];
  programKey: string;
  onChangeTextInput(key: string, value: string);
}) {
  return (
    <div className="Course-Creation-radio">
      <p>{props.name + ':'}</p>
      <RadioGroup
        row
        className="Question-Options"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(event) => props.onChangeTextInput(props.programKey, event.target.value)}
      >
        {props.options.map((v) => {
          if (v == 'Article') {
            // Hard Code to disable article
            return (
              <FormControlLabel
                key={v}
                value={v}
                control={<Radio />}
                label={v + '(Coming Soon)'}
                disabled={true}
              />
            );
          } else {
            return <FormControlLabel key={v} value={v} control={<Radio />} label={v} />;
          }
        })}
      </RadioGroup>
    </div>
  );
}

function QuizQuestions(props: {
  onUpdateQuestionTitle(key: number, value: string);
  onUpdateChoices(questionNumber: number, choiceNumber: number, value: string);
  onSelectAnswer(questionNumber: number, value: string);
}) {
  return (
    <div className="Course-Creation-Questions">
      <p className="Course-Creation-Questions-Title">Quiz Questions</p>
      <p className="Course-Creation-Questions-Sub">
        Fill in the questions and select the correct answers.
      </p>
      <div className="Course-Creation-Question-Container">
        {defaultQuestion.map((v, i) => {
          return (
            <QuizQuestion
              key={'question-' + i}
              id={i + 1}
              onUpdateQuestionTitle={props.onUpdateQuestionTitle}
              onUpdateChoices={props.onUpdateChoices}
              onSelectAnswer={props.onSelectAnswer}
            ></QuizQuestion>
          );
        })}
      </div>
    </div>
  );
}

function QuizQuestion(props: {
  id: number;
  onUpdateQuestionTitle(key: number, value: string);
  onUpdateChoices(questionNumber: number, choiceNumber: number, value: string);
  onSelectAnswer(questionNumber: number, value: string);
}) {
  return (
    <div className="Question-Container">
      <p className="Question-Container-id">{'Question ' + props.id}</p>
      <input
        className="Question-Container-Title"
        placeholder="Enter Question"
        onChange={(event) => props.onUpdateQuestionTitle(props.id - 1, event.target.value)}
      ></input>
      <RadioGroup
        className="Answers-Options"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(event) => props.onSelectAnswer(props.id - 1, event.target.value)}
      >
        {choices.map((v, i) => {
          return (
            <QuestionChoice
              id={props.id}
              choice={v}
              answerKey={i}
              key={'choices-' + i + v}
              onUpdateChoices={props.onUpdateChoices}
            ></QuestionChoice>
          );
        })}
      </RadioGroup>
    </div>
  );
}

function QuestionChoice(props: {
  id: number;
  choice: string;
  answerKey: number;
  onUpdateChoices(questionNumber: number, choiceNumber: number, value: string);
}) {
  return (
    <div className="Question-Choice">
      <FormControlLabel
        key={props.id + '-' + props.choice}
        value={props.choice}
        control={<Radio />}
        label=""
      />
      <input
        type="text"
        name={props.id + '-' + props.choice}
        placeholder={'Option ' + props.choice}
        onChange={(event) =>
          props.onUpdateChoices(props.id - 1, props.answerKey, event.target.value)
        }
      ></input>
    </div>
  );
}

function CourseCreation(props: {
  provider: ethers.providers.Web3Provider | undefined;
  isConnect: boolean;
  isAuthor: boolean;
  setIsAuthor(isAuthor: boolean): void;
}) {
  const [ipfsProgram, setIpfsProgram] = useState<ipfs.IProgramObjectIPFS>({
    description: '',
    duration: '0',
    link: '',
    topic: '',
    type: '',
    questions: defaultQuestion,
  });

  const [contractProgram, setContractProgram] = useState<contracts.INewProgram>({
    _title: '',
    _cid: '',
    _reward: {
      rewardToken: '',
      rewardPerAddress: '',
      rewardAddressCap: '',
      rewardDistributed: '',
    },
    _answers: ['', '', '', ''],
  });

  const [link, setLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessingTrx, setIsProcessingTrx] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [link]);

  const onSubmitHandler = async () => {
    const { isValid, err } = validateData(ipfsProgram, contractProgram);
    if (!isValid) {
      setErrorMsg(err);
    } else {
      setErrorMsg(err);
      if (!props.provider) return;
      setIsProcessingTrx(true);
      try {
        await createProgram(props.provider, ipfsProgram, contractProgram);
        const id = await getNumberOfPrograms();
        setIsProcessingTrx(false);
        navigate('../course-detail/' + id);
      } catch (error) {
        setErrorMsg(error as string);
        setIsProcessingTrx(false);
      }
    }
  };

  const onChangeIpfsTextInput = (key: string, value: string) => {
    const tempIpfsProgram = ipfsProgram;
    tempIpfsProgram[key] = value;
    setLink(tempIpfsProgram.link);
    setIpfsProgram(tempIpfsProgram);
  };

  const onChangeContractTextInput = (key: string, value: string) => {
    const tempContractProgram = contractProgram;
    tempContractProgram[key] = value;
    setContractProgram(tempContractProgram);
  };

  const onUpdateReward = (key: string, value: string) => {
    const tempReward = contractProgram;
    tempReward._reward[key] = value;
    setContractProgram(tempReward);
  };

  const onUpdateQuestionTitle = (key: number, value: string) => {
    const tempIpfsProgram = ipfsProgram;
    tempIpfsProgram.questions[key].title = value;
    setIpfsProgram(tempIpfsProgram);
  };

  const onUpdateChoices = (questionNumber: number, choiceNumber: number, value: string) => {
    const tempIpfsProgram = ipfsProgram;
    tempIpfsProgram.questions[questionNumber].choices[choiceNumber] = value;
    setIpfsProgram(tempIpfsProgram);
  };

  const onSelectAnswer = (questionNumber: number, value: string) => {
    const tempContractProgram = contractProgram;
    tempContractProgram._answers[questionNumber] = value;
    setContractProgram(tempContractProgram);
  };

  const onMint = async (provider: ethers.providers.Web3Provider | undefined) => {
    if (!provider) return;
    await contracts.mintAuthor(provider);
    props.setIsAuthor(await contracts.isUserIsAuthor(provider));
  };

  return (
    <div className="Course-Creation">
      {(!props.isConnect || !props.isAuthor) && (
        <div className="Course-Creation-Banner">
          {!props.isConnect ? (
            <div>Please Connect Your Wallet.</div>
          ) : (
            <div className="Mint-Author">
              <p>Please get an Author NFT by clikcing the below button:</p>
              <div onClick={() => onMint(props.provider)}>Mint</div>
            </div>
          )}
        </div>
      )}
      <h1>Create Course</h1>
      <div className="Course-Creation-Container">
        <TextInput
          name="Course Name"
          placeholder="Enter Course Name"
          inputType="text"
          programKey="_title"
          onChangeTextInput={onChangeContractTextInput}
        ></TextInput>
        <TextInput
          name="Course Description"
          placeholder="Enter Course Description"
          inputType="text"
          programKey="description"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <Radios
          name="Course Material Type"
          options={Object.values(type)}
          programKey="type"
          onChangeTextInput={onChangeIpfsTextInput}
        ></Radios>
        <Radios
          name="Select Course Topic Category"
          options={Object.values(topic)}
          programKey="topic"
          onChangeTextInput={onChangeIpfsTextInput}
        ></Radios>
        <TextInput
          name="URL to Course Material"
          placeholder="Enter Youtube URL"
          inputType="text"
          programKey="link"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        {ipfsProgram.link !== '' && (
          <div className="video-responsive">
            <iframe
              width="50%"
              height="300"
              src={
                'https://www.youtube.com/embed/' +
                ipfsProgram.link.substring(ipfsProgram.link.indexOf('watch?v=') + 8)
              }
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        )}
        <Radios
          name="Select Course Duration"
          options={Object.values(duration)}
          programKey="duration"
          onChangeTextInput={onChangeIpfsTextInput}
        ></Radios>
        <TextInput
          name="Reward Token Address"
          placeholder="Enter Token Address"
          inputType="text"
          programKey="rewardToken"
          onChangeTextInput={onUpdateReward}
        ></TextInput>
        <TextInput
          name="Amount of Reward Token per Certificate"
          placeholder="Enter Amount of Reward Token Per Certificate"
          inputType="number"
          programKey="rewardPerAddress"
          onChangeTextInput={onUpdateReward}
        ></TextInput>
        <TextInput
          name="Number of Reward"
          placeholder="Enter number of reward"
          inputType="number"
          programKey="rewardAddressCap"
          onChangeTextInput={onUpdateReward}
        ></TextInput>
        <QuizQuestions
          onUpdateQuestionTitle={onUpdateQuestionTitle}
          onUpdateChoices={onUpdateChoices}
          onSelectAnswer={onSelectAnswer}
        ></QuizQuestions>
      </div>
      <div
        className="Course-Creation-Submit"
        onClick={onSubmitHandler}
        style={isProcessingTrx ? { opacity: 0.5 } : {}}
      >
        {isProcessingTrx ? 'Processing...' : 'Submit'}
      </div>
      {errorMsg !== '' && <p className="Error-Message">{errorMsg}</p>}
    </div>
  );
}

export default CourseCreation;
