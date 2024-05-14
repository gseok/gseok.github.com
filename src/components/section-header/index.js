import React from 'react';
import './style.scss';

function SectionHeader({ title, onClick }) {
  return (
    <div className="section-header-wrapper" onClick={() => {
      if (onClick) onClick();
    }}>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default SectionHeader;
