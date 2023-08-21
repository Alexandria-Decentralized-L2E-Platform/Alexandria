import { useEffect, useState } from 'react';
import { IProgram, getAllPrograms, topic, type } from '../../api';
import CourseCard from '../common/CourseCard';
import './CourseCatalogue.css';
import CourseFilter from './CourseFilter';

enum duration {
  From0To30 = '0 - 30 mins',
  From30To60 = '30 - 60 mins',
  From60To120 = '1 - 2 hrs',
  Above120 = 'Above 2 hrs',
}

const durationMin = {
  [duration.From0To30]: 0,
  [duration.From30To60]: 30,
  [duration.From60To120]: 60,
  [duration.Above120]: 120,
};

enum status {
  RewardsCertificate = 'Rewards & Certificate',
  CertificateOnly = 'Certificate Only',
}

enum rating {
  Above4p5 = '4.5 and up',
  Above4 = '4.0 and up',
  Above3p5 = '3.5 and up',
  Above3 = '3.0 and up',
}

const courseFilters = [
  {
    title: 'Status',
    options: [status.RewardsCertificate, status.CertificateOnly],
  },
  {
    title: 'Rating',
    options: [rating.Above4p5, rating.Above4, rating.Above3p5, rating.Above3],
  },
  {
    title: 'Topics',
    options: Object.values(topic),
  },
  {
    title: 'Type',
    options: Object.values(type),
  },
  {
    title: 'Duration',
    options: [duration.From0To30, duration.From30To60, duration.From60To120, duration.Above120],
  },
];
function CourseCatalogue() {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const loadProgram = async () => {
    const programs = await getAllPrograms();
    setPrograms(programs);
  };
  const [filters, setFilters] = useState({
    searchBy: '',
    Status: '',
    Rating: '',
    Topics: '',
    Type: '',
    Duration: '',
  });

  useEffect(() => {
    loadProgram();
  }, []);

  const handleFilterChange = async (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const applyFilters = (program) => {
    console.log(program);
    // if (filters.Status && program.status !== filters.Status) return false; // Update this check based on program properties
    // if (filters.Rating && program.rating < parseFloat(filters.Rating.split(' ')[0])) return false;
    // if (filters.Topics && !filters.Topics.includes(program.topic)) return false;
    if (
      filters.searchBy &&
      !program[2].includes(filters.searchBy) &&
      !program.authorName.includes(filters.searchBy)
    )
      return false;
    if (filters.Type && program.type !== filters.Type) return false;
    if (filters.Duration) {
      const durationMinValue = durationMin[filters.Duration];
      if (program.duration < durationMinValue) return false;
    }
    return true;
  };

  return (
    <div className="Course-Catalogue">
      <h1>Browse Courses</h1>
      <div className="Search-Bar">
        <input
          onChange={(searchText) => {
            setFilters((prev) => ({ ...prev, searchBy: searchText.target.value }));
          }}
          placeholder="Search by Course Name or Course Sponsor"
        ></input>
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
            return (
              <CourseFilter
                key={'filter-' + v.title}
                data={v}
                onChange={handleFilterChange}
              ></CourseFilter>
            );
          })}
        </div>
        <div className="Courses">
          {programs.length !== 0 &&
            programs.filter(applyFilters).map((p) => {
              return <CourseCard key={'catalogue-' + p.cid} program={p}></CourseCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default CourseCatalogue;
