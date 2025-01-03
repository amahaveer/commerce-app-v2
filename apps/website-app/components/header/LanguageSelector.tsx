'use client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

const locales: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState<string | undefined>('en');

  useEffect(() => {
    const currentPath = window.location.pathname;
    const match = currentPath.match(/^\/([a-z]{2})/);
    if (match) {
      setSelectedLocale(match[1]); // Set the selected locale based on the URL
    }
  }, []);

  const changeLanguage = (newLocale: string) => {
    const currentPath = window.location.pathname; 
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPath); 
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setSelectedLocale(newLocale);
    changeLanguage(newLocale);
  };

  return (
    <div className="flex items-center space-x-2 bg-white">
      <select
        id="language-select"
        onChange={handleChange}
        value={selectedLocale} // Bind the value to selectedLocale
        className="shadow-sm focus:outline-none p-2 bg-white font-semibold text-sm"
      >
        {locales.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
