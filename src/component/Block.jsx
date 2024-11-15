import React from 'react';
import '../assets/style/Block.css';

const Block = () => {
  return (
    <div className="blocked-container">
      <p className="blocked-text">
        Access restricted: You have been temporarily blocked for 3 days.
      </p>
    </div>
  );
};

export default Block;
