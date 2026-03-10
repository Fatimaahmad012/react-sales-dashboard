import React, { useState, useEffect } from 'react';

const DateInput = ({ value, onChange, placeholder = 'Select Date', ariaLabel, className = '' }) => {
  const [type, setType] = useState(value ? 'date' : 'text');

  useEffect(() => {
    if (value) setType('date');
  }, [value]);

  return (
    <input
      aria-label={ariaLabel}
      type={type}
      placeholder={placeholder}
      className={`${className} border border-gray-300 bg-gray-50 px-3 py-2 rounded text-sm w-full sm:w-auto placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500`}
      value={value}
      onFocus={() => setType('date')}
      onBlur={() => { if (!value) setType('text'); }}
      onChange={onChange}
    />
  );
};

export default DateInput;
