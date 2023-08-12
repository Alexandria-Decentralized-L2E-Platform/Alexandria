function CourseFilter() {
  const data = {
    title: 'Status',
    options: ['In Progress', 'Completed', 'Earning End'],
  };
  return (
    <div className="CourseFilter">
      <div className="FilterName">
        <h2>{data.title}</h2>
        <svg
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
      </div>
      <div className="FilterOptions">
        {data.options.map((v) => {
          return <p key={v}>{v}</p>;
        })}
      </div>
    </div>
  );
}

export default CourseFilter;
