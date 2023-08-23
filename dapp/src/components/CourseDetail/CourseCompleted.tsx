import alexandriaLogo from '../../logo/alexandriaLogo.svg';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProgramById, IProgram, contracts } from '../../api';
import { Rating } from '@mui/material';
import './CourseCompleted.css';

function CourseCompleted(props: { provider: ethers.providers.Web3Provider | undefined }) {
  const { id } = useParams();
  const [program, setProgram] = useState<IProgram | undefined>(undefined);
  const [value, setValue] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [isProcessingTrx, setIsProcessingTrx] = useState(false);

  const navigate = useNavigate();

  const setupPage = async () => {
    if (!id) return;
    const program = await getProgramById(Number(id));
    setProgram(program);
  };

  const onRateHandler = async () => {
    if (!props.provider) return;
    setIsProcessingTrx(true);
    await (await contracts.rateProgram(props.provider, Number(id), value)).wait();
    setIsProcessingTrx(false);
    setIsRated(true);
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
      {!isRated && (
        <div className="Rate-Container">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              if (newValue) setValue(newValue);
            }}
          />
          <div
            className="Course-Rate-Button"
            onClick={onRateHandler}
            style={isProcessingTrx ? { opacity: 0.5 } : {}}
          >
            {isProcessingTrx ? 'Rating...' : 'Rate'}
          </div>
        </div>
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
