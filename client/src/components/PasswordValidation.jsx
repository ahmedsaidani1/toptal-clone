import React from 'react';

const PasswordValidation = ({ password }) => {
  const validations = [
    {
      regex: /.{8,}/,
      message: 'At least 8 characters',
    },
    {
      regex: /[a-z]/,
      message: 'Minimum 1 lowercase',
    },
    {
      regex: /[A-Z]/,
      message: 'Minimum 1 uppercase',
    },
    {
      regex: /[0-9]/,
      message: 'Minimum 1 number',
    },
    {
      regex: /[^A-Za-z0-9]/,
      message: 'Minimum 1 special character',
    },
  ];

  return (
    <div className="mt-2">
      <p className="text-gray-600">Please make sure that your password contains:</p>
      <ul className="list-disc list-inside text-red-500">
        {validations.map((validation, index) => (
          <li key={index} className={validation.regex.test(password) ? 'text-green-500' : 'text-red-500'}>
            {validation.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordValidation;
