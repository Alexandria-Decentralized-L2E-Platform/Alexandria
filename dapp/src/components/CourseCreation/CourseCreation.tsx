import { useState } from 'react';
import { topic, type, ipfs } from '../../api';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import './CourseCreation.css';

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

function Radios(props: { name: string; options: string[] }) {
  return (
    <div className="Course-Creation-radio">
      <p>{props.name + ':'}</p>
      <RadioGroup
        row
        className="Question-Options"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.options.map((v) => {
          return <FormControlLabel key={v} value={v} control={<Radio />} label={v} />;
        })}
      </RadioGroup>
    </div>
  );
}

function QuizQuestions() {
  return (
    <div className="Course-Creation-Questions">
      <p className="Course-Creation-Questions-Title">Quiz Questions</p>
      <p className="Course-Creation-Questions-Sub">
        Fill in the questions and select the correct answers.
      </p>
      <div className="Course-Creation-Question-Container">
        <QuizQuestion id={1}></QuizQuestion>
        <QuizQuestion id={2}></QuizQuestion>
        <QuizQuestion id={3}></QuizQuestion>
        <QuizQuestion id={4}></QuizQuestion>
        <QuizQuestion id={5}></QuizQuestion>
      </div>
    </div>
  );
}

function QuizQuestion(props: { id: number }) {
  return (
    <div className="Question-Container">
      <p className="Question-Container-id">{'Question ' + props.id}</p>
      <input className="Question-Container-Title" placeholder="Enter Question"></input>
      <RadioGroup
        className="Answers-Options"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <QuestionChoice id={props.id} choice="A"></QuestionChoice>
        <QuestionChoice id={props.id} choice="B"></QuestionChoice>
        <QuestionChoice id={props.id} choice="C"></QuestionChoice>
        <QuestionChoice id={props.id} choice="D"></QuestionChoice>
      </RadioGroup>
    </div>
  );
}

function QuestionChoice(props: { id: number; choice: string }) {
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
      ></input>
    </div>
  );
}

function CourseCreation() {
  const [ipfsProgram, setIpfsProgram] = useState<ipfs.IProgramObjectIPFS>({
    description: '',
    duration: 0,
    link: '',
    topic: '',
    type: '',
    questions: [],
  });

  const onSubmitHandler = () => {
    console.log(ipfsProgram);
  };

  const onChangeIpfsTextInput = (key: string, value: string) => {
    const tempIpfsProgram = ipfsProgram;
    tempIpfsProgram[key] = value;
    setIpfsProgram(tempIpfsProgram);
  };

  return (
    <div className="Course-Creation">
      <h1>Create Course</h1>
      <div className="Course-Creation-Container">
        <TextInput
          name="Course Name"
          placeholder="Enter Course Name"
          inputType="text"
          programKey="title"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <TextInput
          name="Course Description"
          placeholder="Enter Course Description"
          inputType="text"
          programKey="description"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <Radios name="Course Material Type" options={Object.values(type)}></Radios>
        <Radios name="Select Course Topic Category" options={Object.values(topic)}></Radios>
        <TextInput
          name="URL to Course Material"
          placeholder="Enter Youtube URL"
          inputType="text"
          programKey="link"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <TextInput
          name="Reward Token Address"
          placeholder="Enter Token Address"
          inputType="text"
          programKey="rewardToken"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <TextInput
          name="Amount of Reward Token per Certificate"
          placeholder="Enter Amount of Reward Token Per Certificate"
          inputType="number"
          programKey="amount"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <TextInput
          name="Number of Reward"
          placeholder="Enter number of reward"
          inputType="number"
          programKey="cap"
          onChangeTextInput={onChangeIpfsTextInput}
        ></TextInput>
        <QuizQuestions></QuizQuestions>
      </div>
      <div className="Course-Creation-Submit" onClick={onSubmitHandler}>
        Submit
      </div>
    </div>
  );
}

export default CourseCreation;
