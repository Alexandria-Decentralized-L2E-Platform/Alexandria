import alexandriaLogo from '../../logo/alexandriaLogo.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProgramById, IProgram } from '../../api';
import './CourseCompleted.css';

function CourseCompleted(props: { provider: ethers.providers.Web3Provider | undefined }) {
  const { id } = useParams();
  const [program, setProgram] = useState<IProgram | undefined>(undefined);
  const navigate = useNavigate();

  const setupPage = async () => {
    if (!id) return;
    const program = await getProgramById(Number(id));
    setProgram(program);
  };

  useEffect(() => {
    setupPage();
  }, [props]);

  return (
    <div className="Course-Completed">
      <img src={alexandriaLogo}></img>
      <h2>Congrats!</h2>
      <p>You have completed the course, and earned</p>
      {program && (
        <p className="Course-Completed-Earned">
          {program.reward.rewardPerAddress + ' ' + program.reward.tokenSymbol}
        </p>
      )}
      <p>View your certificate below:</p>
      <div
        onClick={() => {
          window.scrollTo(0, 0);
          navigate('/my-certificates');
        }}
        className="Course-Completed-Button"
      >
        View Your Certificate
      </div>
    </div>
  );
}

export default CourseCompleted;
