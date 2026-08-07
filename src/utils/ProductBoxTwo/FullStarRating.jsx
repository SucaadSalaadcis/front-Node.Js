const FullStarRating = ({ rate, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg key={idx} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="#FDC040"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ))}
      <span className="ml-2 text-sm font-semibold">({rate})</span>
    </div>
  );
};

export default FullStarRating;
