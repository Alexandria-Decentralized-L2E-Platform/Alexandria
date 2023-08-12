import CourseFilter from './CourseFilter';
import './CourseCatalogue.css';

function CourseCatalogue() {
  return (
    <div className="CourseCatalogue">
      <h1>Browse Courses</h1>
      <div className="SearchBar">
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
      <div className="CourseContainer">
        <div className="CourseFilterContainer">
          <CourseFilter></CourseFilter>
          <CourseFilter></CourseFilter>
          <CourseFilter></CourseFilter>
          <CourseFilter></CourseFilter>
        </div>
        <div className="Courses">123</div>
      </div>
    </div>
  );
}

export default CourseCatalogue;
