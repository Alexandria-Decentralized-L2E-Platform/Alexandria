import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

interface filterData {
  title: string;
  options: string[];
}

function CourseFilter(props: {
  data: filterData;
  onChange: (filterType: string, value: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleOptionChange = (event) => {
    props.onChange(props.data.title, event.target.value);
  };

  return (
    <div className="Course-Filter">
      <div className="Filter-Name">
        <h2>{props.data.title}</h2>
        {isExpanded ? (
          <svg
            onClick={() => {
              setIsExpanded(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <path
              d="M1.4451 9.49532C1.02864 9.49532 0.612178 9.2944 0.327454 8.91125C-0.178249 8.23373 -0.0890072 7.22912 0.531436 6.67308L5.08277 2.57524C5.61397 2.09396 6.38315 2.09396 6.91435 2.57524L11.4699 6.67776C12.0861 7.23379 12.1796 8.23373 11.6739 8.91592C11.1682 9.59344 10.2588 9.69624 9.63834 9.1402L6.00068 5.86473L2.36302 9.1402C2.09529 9.38318 1.76807 9.49999 1.44935 9.49999L1.4451 9.49532Z"
              fill="#9E7C5E"
            />
          </svg>
        ) : (
          <svg
            onClick={() => {
              setIsExpanded(true);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <path
              d="M1.4451 2.64753C1.02864 2.64753 0.612178 2.84845 0.327454 3.2316C-0.178249 3.90913 -0.0890072 4.91373 0.531436 5.46977L5.08277 9.56762C5.61397 10.0489 6.38315 10.0489 6.91435 9.56762L11.4699 5.4651C12.0861 4.90906 12.1796 3.90913 11.6739 3.22693C11.1682 2.54941 10.2588 2.44661 9.63834 3.00265L6.00068 6.27812L2.36302 3.00265C2.09529 2.75967 1.76807 2.64286 1.44935 2.64286L1.4451 2.64753Z"
              fill="#9E7C5E"
            />
          </svg>
        )}
      </div>
      {isExpanded ? (
        <RadioGroup
          className="Filter-Options"
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleOptionChange}
        >
          {props.data.options.map((v) => {
            return <FormControlLabel key={v} value={v} control={<Radio />} label={v} />;
          })}
        </RadioGroup>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CourseFilter;
