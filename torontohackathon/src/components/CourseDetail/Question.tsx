import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

interface QuestionData {
  number: number;
  title: string;
  choices: string[];
  onSelectAnswer(i: number, choice: string): void;
}

function Question(props: { data: QuestionData }) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch ((event.target as HTMLInputElement).value) {
      case '0':
        props.data.onSelectAnswer(props.data.number, 'A');
        break;
      case '1':
        props.data.onSelectAnswer(props.data.number, 'B');
        break;
      case '2':
        props.data.onSelectAnswer(props.data.number, 'C');
        break;
      case '3':
        props.data.onSelectAnswer(props.data.number, 'D');
        break;
    }
  };

  return (
    <div className="Question">
      <p>{props.data.number + '. ' + props.data.title}</p>
      <RadioGroup
        className="Chocies"
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {props.data.choices.map((v, i) => {
          return <FormControlLabel key={v} value={i} control={<Radio />} label={v} />;
        })}
      </RadioGroup>
    </div>
  );
}

export default Question;
