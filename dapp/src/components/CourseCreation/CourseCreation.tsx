// import { useEffect, useState } from 'react';
import { topic, type } from '../../api';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
// import './CourseCatalogue.css';
// import iconAdd from '../../logo/iconAdd.svg';
// import iconMinus from '../../logo/iconMinus.svg';

function TextInput(props: { name: string; placeholder: string }) {
  return (
    <div className="Course-Creation-txt">
      <p>{props.name + ':'}</p>
      <input type="text" placeholder={props.placeholder} />
    </div>
  );
}

function Radios(props: { name: string; options: string[] }) {
  return (
    <div className="Course-Creation-radio">
      <p>{props.name + ':'}</p>
      <RadioGroup
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
      <div className="Course-Creation-Title-Container">
        <p>Quiz Questions</p>
        <p>Fill in the questions and select the correct answers.</p>
      </div>
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
  // const [title, setTitle] = useState();
  return (
    <div className="Question-Container">
      <input className="Question-Container-Title"></input>
      <RadioGroup
        className="Answers-Options"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel key={props.id + '-A'} value={'A'} control={<Radio />} label="" />
        <input type="text" name={props.id + '-A'}></input>;
        <FormControlLabel key={props.id + '-B'} value={'B'} control={<Radio />} label="" />
        <FormControlLabel key={props.id + '-C'} value={'C'} control={<Radio />} label="" />
        <FormControlLabel key={props.id + '-D'} value={'D'} control={<Radio />} label="" />
      </RadioGroup>
    </div>
  );
}

function CourseCreation() {
  return (
    <div className="Course-Creation">
      <h1>Create Course</h1>
      <div className="Course-Creation-Container">
        <TextInput name="Course Name" placeholder="Enter CourseName"></TextInput>
        <TextInput name="Course Description" placeholder="Enter CourseName"></TextInput>
        <Radios name="Course Material Type" options={Object.values(type)}></Radios>
        <Radios name="Select Course Topic Category" options={Object.values(topic)}></Radios>
        <TextInput name="URL to Course Material" placeholder="Enter Youtube URL"></TextInput>
        <TextInput name="Reward Token Address" placeholder="Enter Token Address"></TextInput>
        <TextInput
          name="Amount of reward token per certificate"
          placeholder="Enter Amount of Reward Token Per Certificate"
        ></TextInput>
        <TextInput name="Number of address" placeholder="Enter number of address"></TextInput>
        <QuizQuestions></QuizQuestions>
      </div>
    </div>
  );
}

export default CourseCreation;
