// OptionsBar.js
import React, { useState } from 'react';
import OptionsBarItem from './OptionBarItem';  // Adjust the path based on your project structure

const OptionsBar = () => {
  const [isActive, setIsActive] = useState({
    Discover: true,
    Visualize: false,
    'Generate Report': false,
  });

  return (
    <div className="options-bar">
      <OptionsBarItem title="Discover" isActive={isActive} setIsActive={setIsActive} comp="Discover" />
      <OptionsBarItem title="Visualize" isActive={isActive} setIsActive={setIsActive} comp="Visualize" />
      <OptionsBarItem title="Generate Report" isActive={isActive} setIsActive={setIsActive} comp="Generate Report" />
    </div>
  );
};

export default OptionsBar;
