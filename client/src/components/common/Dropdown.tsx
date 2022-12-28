import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  defaultOptionText: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultOptionText }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };


  return (
    <select
      className={
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      }
      value={selectedOption}
      onChange={handleChange}
    >
      <option value="" disabled>
        {defaultOptionText}
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
