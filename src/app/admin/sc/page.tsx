'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackendUrl = "https://recruitments-portal-backend.vercel.app";

interface SeniorCoreEmail {
  email: string;
}

const SeniorCoreList: React.FC = () => {
  const [seniorCoreEmails, setSeniorCoreEmails] = useState<SeniorCoreEmail[]>([]);
  const [newEmail, setNewEmail] = useState<string>('');
  const [emailToRemove, setEmailToRemove] = useState<string>('');

  useEffect(() => {
    fetchSeniorCoreList();
  }, []);

  const fetchSeniorCoreList = async () => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminaccessToken'))
        ?.split('=')[1];

      const response = await axios.get<SeniorCoreEmail[]>(`${BackendUrl}/admin/senior-core`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSeniorCoreEmails(response.data);
    } catch (error) {
      console.error('Error fetching senior core list:', error);
    }
  };

  const handleAddEmail = async () => {
    if (newEmail && !seniorCoreEmails.some((email) => email.email === newEmail)) {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('adminaccessToken'))
          ?.split('=')[1];

        await axios.post(`${BackendUrl}/admin/senior-core/add`, { email: newEmail }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setNewEmail('');
        fetchSeniorCoreList(); // Refresh the senior core list
      } catch (error) {
        console.error('Error adding senior core email:', error);
      }
    }
  };

  const handleRemoveEmail = async () => {
    if (emailToRemove && seniorCoreEmails.some((email) => email.email === emailToRemove)) {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('adminaccessToken'))
          ?.split('=')[1];

        await axios.post(`${BackendUrl}/admin/senior-core/remove`, { email: emailToRemove }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmailToRemove('');
        fetchSeniorCoreList(); // Refresh the senior core list
      } catch (error) {
        console.error('Error removing senior core email:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-md mr-8 w-1/3">
        <h2 className="text-xl font-bold mb-4">Senior Core Emails</h2>
        <ul className="list-disc list-inside">
          {seniorCoreEmails.map((email, index) => (
            <li key={index} className="mb-2">{email.email}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-8 rounded-md mr-8 w-1/3">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Add Email to Senior Core</h3>
          <div className="flex">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter email to add"
              className="border border-gray-300 rounded-l-md px-2 py-1 w-full"
            />
            <button
              onClick={handleAddEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r-md"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Remove Email from Senior Core</h3>
          <div className="flex">
            <input
              type="email"
              value={emailToRemove}
              onChange={(e) => setEmailToRemove(e.target.value)}
              placeholder="Enter email to remove"
              className="border border-gray-300 rounded-l-md px-2 py-1 w-full"
            />
            <button
              onClick={handleRemoveEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r-md"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorCoreList;