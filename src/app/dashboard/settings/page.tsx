'use client'
// pages/settings.tsx

import React, { useState } from 'react';

const SettingsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);


  const handleSaveChanges = () => {
    // Handle saving changes logic (e.g., API calls, validation, etc.)
    console.log('Saving changes:', { name, email, password, twoFactorEnabled, themeColor, language });
  };

  const [profile, setProfile] = useState({
    fullName: 'Asiimwe J Arnold',
    email: 'asiimwearnold25@gmail.com',
    password: ''
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    sms: false,
    totp: false
  });

  const [themeColor, setThemeColor] = useState('bg-blue-500');

  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('GMT');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleTwoFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTwoFactorAuth((prevTwoFactorAuth) => ({
      ...prevTwoFactorAuth,
      [name]: checked
    }));
  };

  const handleThemeColorChange = (color: string) => {
    setThemeColor(color);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  };

  const themeColors = [
    'bg-blue-500', 'bg-indigo-500', 'bg-pink-500', 'bg-purple-500',
    'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-gray-500', 'bg-teal-500'
  ];

  const languages = ['English', 'French', 'Spanish'];
  const timezones = ['GMT', 'EST', 'PST'];

  return (  
  <div className="min-h-screen p-6 dark:bg-gray-900 flex flex-col justify-center sm:py-12 -z-10">
    <div className="relative py-3 sm:max-w-2xl sm:mx-auto -z-9">
      <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20  ">
        <div className="max-w-md mx-auto -z-8">
          <h1 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white ">My Settings</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Profile</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your personal information and account security settings.</p>
              <div className="flex items-center mt-4 space-x-4">
                <img className="h-16 w-16 rounded-full" src="/path/to/avatar.jpg" alt="Avatar" />
                <div>
                  {Object.keys(profile).map((key) => (
                    <div className="mb-2" key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type={key === 'password' ? 'password' : 'text'}
                        name={key}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        value={profile[key as keyof typeof profile]}
                        onChange={handleProfileChange}
                        placeholder={key === 'password' ? 'Enter New Password' : ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Two-factor authentication (2FA)</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an authenticator app.
              </p>
              <div className="mt-4">
                {Object.keys(twoFactorAuth).map((key) => (
                  <div className="flex items-center mt-4" key={key}>
                    <input
                      id={key}
                      name={key}
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      checked={twoFactorAuth[key as keyof typeof twoFactorAuth]}
                      onChange={handleTwoFactorChange}
                    />
                    <label htmlFor={key} className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      {key === 'sms' ? 'Text Message (SMS) (Business)' : 'Authenticator App (TOTP)'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Theme color</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose a preferred theme for the app.</p>
              <div className="mt-2 flex items-center space-x-2">
                {themeColors.map((color) => (
                  <div
                    key={color}
                    className={`h-8 w-8 rounded-full cursor-pointer ${color} ${color === themeColor ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                    onClick={() => handleThemeColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">Language & Region</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize your language and region.</p>
              <div className="mt-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    {languages.map((lang) => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    value={timezone}
                    onChange={handleTimezoneChange}
                  >
                    {timezones.map((tz) => (
                      <option key={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   );
};

export default SettingsPage;
