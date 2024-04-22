'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

interface Team {
  domain: string;
  teamName: string;
  date: string;
  time: string;
  meetLink: string;
  teamMembers: string[];
  supervisors: string[];
}

const TeamDetails = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    fetchTeamNames();
  }, []);

  const fetchTeamNames = async () => {
    try {
      const response = await axios.get<Team[]>('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching team names:', error);
    }
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setMeetingLink(team.meetLink);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingLink(e.target.value);
  };

  const handleLinkSubmit = async () => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminaccessToken'))
        ?.split('=')[1];

      if (!accessToken) {
        toast.error('Access Token not found in cookies', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        teamName: selectedTeam?.teamName || '', // Use optional chaining to handle null case
        meetLink: meetingLink,
      };

      await axios.put('/api/teams', requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success('Meeting link changed', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error updating meeting link', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const handleApprove = async (email: string) => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminaccessToken'))
        ?.split('=')[1];

      if (!accessToken) {
        toast.error('Access Token not found in cookies', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        result: 1,
        email,
        round: 2,
        domain: selectedTeam?.domain || 'pnm', // Use optional chaining and provide a fallback value
      };

      await axios.post('https://recruitments-portal-backend.vercel.app/eval/set_report', requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success('Response approved successfully', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error approving response', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const handleReject = async (email: string) => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminaccessToken'))
        ?.split('=')[1];

      if (!accessToken) {
        toast.error('Access Token not found in cookies', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        result: 2,
        email,
        round: 2,
        domain: selectedTeam?.domain || 'pnm', // Use optional chaining and provide a fallback value
      };

      await axios.post('https://recruitments-portal-backend.vercel.app/eval/set_report', requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.error('Response rejected successfully', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error rejecting response', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Domain : Pnm</h2>
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        {teams.map((team) => (
          <div
            key={team.teamName}
            className={`p-2 rounded-md cursor-pointer ${
              selectedTeam?.teamName === team.teamName ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleTeamSelect(team)}
          >
            {team.teamName}
          </div>
        ))}
      </div>
      {selectedTeam && (
        <div className="w-3/4 ml-4 bg-white p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Team Details</h2>
          <p>Domain: {selectedTeam.domain}</p>
          <p>Date: {selectedTeam.date}</p>
          <p>Time: {selectedTeam.time}</p>
          <div className="mb-4">
            <label htmlFor="meetingLink" className="block font-bold mb-2">
              Meeting Link:
            </label>
            <input
              type="text"
              id="meetingLink"
              value={meetingLink}
              onChange={handleLinkChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              onClick={handleLinkSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Submit
            </button>
          </div>
          <h3 className="text-lg font-bold mb-2">Team Members:</h3>
          <ul className="list-disc pl-4">
            {selectedTeam.teamMembers.map((member, index) => (
              <li key={index} className="flex items-center mb-2">
                <span>{member}</span>
                <div className="ml-4">
                  <button
                    onClick={() => handleApprove(member)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(member)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;