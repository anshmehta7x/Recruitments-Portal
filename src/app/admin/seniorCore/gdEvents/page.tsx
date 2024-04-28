"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";

interface Team {
  domain: string;
  teamName: string;
  date: string;
  time: string;
  meetLink: string;
  teamMembers: string[];
  supervisors: string[];
}
const BackendUrl = `${process.env.BACKEND_URL}`;
const TeamDetails = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [meetingLink, setMeetingLink] = useState("");

  const domain = "events";

  useEffect(() => {
    fetchTeamNames();
  }, []);

  const fetchTeamNames = async () => {
    try {
      const userEmail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email"))
        ?.split("=")[1];
      const sctoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("scaccessToken"))
        ?.split("=")[1];
      const domain = "events";
      const response = await axios.get(
        `${BackendUrl}/seniorcore/group-discussion/${domain}/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${sctoken}`,
          },
        }
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching team names:", error);
    }
  };

  const handleTeamSelect = async (teamName: string) => {
    try {
      const sctoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("scaccessToken"))
        ?.split("=")[1];
      const response = await axios.get(
        `${BackendUrl}/seniorcore/teamDetails/${teamName}/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${sctoken}`,
          },
        }
      );
      setSelectedTeam(response.data);
      const teamMembersEmails = response.data.teamMembers[0].split(" ");
      response.data.teamMembers = teamMembersEmails;
      setMeetingLink(response.data.meetLink);
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingLink(e.target.value);
  };

  const handleLinkSubmit = async () => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("scaccessToken"))
        ?.split("=")[1];

      if (!accessToken) {
        toast.error("Access Token not found in cookies", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        teamName: selectedTeam?.teamName || "",
        domain: selectedTeam?.domain || "",
        meetLink: meetingLink,
      };

      await axios.put(`${BackendUrl}/seniorcore/meetLink`, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Meeting link changed", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Error updating meeting link", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleApprove = async (email: string) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("scaccessToken"))
        ?.split("=")[1];

      if (!accessToken) {
        toast.error("Access Token not found in cookies", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        result: 1,
        email,
        round: 2,
        domain: selectedTeam?.domain || "events",
      };

      await axios.post(
        `${process.env.BACKEND_URL}/seniorcore/set_round2_gd`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Response approved successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Error approving response", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleReject = async (email: string) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("scaccessToken"))
        ?.split("=")[1];

      if (!accessToken) {
        toast.error("Access Token not found in cookies", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const requestBody = {
        result: 2,
        email,
        round: 2,
        domain: selectedTeam?.domain || "events",
      };

      await axios.post(
        `${process.env.BACKEND_URL}/seniorcore/set_round2_gd`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.error("Response rejected successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Error rejecting response", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Domain : {domain}</h2>
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        {teams.map((teamName) => (
          <div
            key={teamName}
            className={`p-2 rounded-md cursor-pointer ${
              selectedTeam?.teamName === teamName ? "bg-gray-200" : ""
            }`}
            onClick={() => handleTeamSelect(teamName)}
          >
            {teamName}
          </div>
        ))}
      </div>
      {selectedTeam && (
        <div className="w-3/4 ml-4  bg-white p-4 rounded-md ">
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
