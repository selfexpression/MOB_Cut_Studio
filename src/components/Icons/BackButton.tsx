import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
    >
      <svg
        viewBox="0 -6 380.688 380"
        width="1.5em"
        height="1.5em"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m164.6875 213.03125h16c93.074219 0 168.441406
        71.832031 200 155.664062v-75.664062c0-113.046875-88.800781-192-216-192-4.417969
        0-8-3.582031-8-8v-92.6875l-156.6875 156.6875 156.6875 156.6875v-92.6875c0-4.417969 3.582031-8 8-8zm0 0"
        />
      </svg>
    </button>
  );
};
