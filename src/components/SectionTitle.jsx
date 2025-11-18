import React from 'react';
import './SectionTitle.css';

function SectionTitle({ title }) {
  return (
    <div className="section-title-wrapper">
      <h1 className="section-title">{title}</h1>
      <div className="section-title-underline"></div>
    </div>
  );
}

export default SectionTitle;  