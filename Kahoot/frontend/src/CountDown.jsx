import * as React from 'react';
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
export const CountDown = (value) => {
  console.log(value);
  const t = value.value;
  return (
    <div className="countdown">
      {t > 0 ? `Time Remaining: ${t}` : 'Time is Up'}
    </div>
  );
};
