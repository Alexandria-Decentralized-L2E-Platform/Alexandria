import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

interface QuestionData {
  number: number;
  title: string;
  choices: string[];
}

function Question(props: { data: QuestionData }) {
  return (
    <div className="Question">
      <p>{props.data.number + '. ' + props.data.title}</p>
      <RadioGroup
        className="Chocies"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.data.choices.map((v) => {
          return <FormControlLabel key={v} value={v} control={<Radio />} label={v} />;
        })}
      </RadioGroup>
    </div>
  );
}

export default Question;
