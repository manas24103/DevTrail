import React from 'react';

const PlatformCard = ({ title, data, loading }) => {
  if (loading) return <div className="card">Loading {title} data...</div>;
  if (!data) return <div className="card">No {title} data available</div>;

  return (
    <div className="card">
      <h3>{title}</h3>
      {data.rating && <p>Rating: {data.rating}</p>}
      {data.rank && <p>Rank: {data.rank}</p>}
      {data.problemsSolved && <p>Problems Solved: {data.problemsSolved}</p>}
      {data.message && <p>{data.message}</p>}
    </div>
  );
};

export default PlatformCard;
