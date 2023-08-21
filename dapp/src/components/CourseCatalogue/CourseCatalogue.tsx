import CourseFilter from './CourseFilter';
import CourseCard from '../common/CourseCard';
import { getAllPrograms, IProgram } from '../../api';
import { useEffect, useState } from 'react';
import './CourseCatalogue.css';

const courseFilters = [
  {
    title: 'Status',
    options: ['Rewards & Certificate', 'Certificate Only'],
  },
  {
    title: 'Rating',
    options: ['4.5 and up', '4.0 and up', '3.5 and up', '3.0 and up'],
  },
  {
    title: 'Topics',
    options: [
      'DAO / Community',
      'NFT',
      'Deif',
      ' Gamefi',
      'Metaverse',
      'X-2-Earn',
      'Music NFT',
      'Infra / API',
      'Crosschain',
    ],
  },
  {
    title: 'Type',
    options: ['Videos', 'Articles'],
  },
  {
    title: 'Duration',
    options: ['0 - 30 mins', '30 - 60 mins', '1 hr - 2 hrs', 'Above 2 hrs'],
  },
];
function CourseCatalogue() {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const loadProgram = async () => {
    const programs = await getAllPrograms();
    setPrograms(programs);
  };

  useEffect(() => {
    loadProgram();
  }, []);

  return (
    <div className="Course-Catalogue">
      <h1>Browse Courses</h1>
      <div className="Search-Bar">
        <input placeholder="Search by Course Name or Course Sponsor"></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4167 18.75C5.81433 18.75 2.08337 15.019 2.08337 10.4167C2.08337 5.8143 5.81433 2.08334 10.4167 2.08334C15.0191 2.08334 18.75 5.8143 18.75 10.4167C18.75 12.3424 18.0968 14.1156 16.9999 15.5267L22.6116 21.1384L21.1385 22.6116L15.5268 16.9999C14.1156 18.0968 12.3424 18.75 10.4167 18.75ZM16.6667 10.4167C16.6667 13.8685 13.8685 16.6667 10.4167 16.6667C6.96493 16.6667 4.16671 13.8685 4.16671 10.4167C4.16671 6.9649 6.96493 4.16668 10.4167 4.16668C13.8685 4.16668 16.6667 6.9649 16.6667 10.4167Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="Course-Container">
        <div className="Course-Filter-Container">
          {courseFilters.map((v) => {
            return <CourseFilter key={'filter-' + v.title} data={v}></CourseFilter>;
          })}
        </div>
        <div className="Courses">
          {programs.length !== 0 &&
            programs.map((p) => {
              return <CourseCard key={'catalogue-' + p.cid} program={p}></CourseCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default CourseCatalogue;
