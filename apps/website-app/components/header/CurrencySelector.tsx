'use client';
import React, { useState } from 'react';

const currencies = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  // Add more currencies as needed
];

const CurrencySelector: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
    // Here you can also add logic to handle currency change
  };

  return (
    <div>
      {/* <label htmlFor="currency-select">Currency:</label> */}
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={handleChange}
        className=" shadow-sm focus:outline-none  p-2 bg-white font-semibold text-sm "
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
