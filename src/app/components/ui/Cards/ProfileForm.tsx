'use client'
import React, { useState } from 'react';

interface ProfileFormProps {}

const ProfileForm: React.FC<ProfileFormProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    companyName: '',
    photo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    if (inputElement.files && inputElement.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        photo: inputElement.files[0]
      }));
    }
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Company name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
        />
      </div>
    </>
  );
};

export default ProfileForm;
