import { Button } from '@mui/material';
import alexandriaLogo from './logo/alexandriaLogo.svg';
import { Link } from 'react-router-dom';

function CourseCompleted(props: { reward: string }) {
  return (
    <div className="Coures-Completed">
      <img src={alexandriaLogo}></img>
      <h2>Congrats!</h2>
      <p>You have completed the course, and earned</p>
      <p>{props.reward}</p>
      <p>View your certificate below:</p>
      <Button
        onClick={() => window.scrollTo(0, 0)}
        component={Link}
        to={'/certificates'}
        className="Quiz-Button"
      >
        View
      </Button>
    </div>
  );
}

export default CourseCompleted;
