"use client";
import { useState } from "react";
import axios from "axios";

interface Response {
  _id: {
    $oid: string;
  };
  email: string;
  domain: string;
  startTime: string;
  submissionTime: string;
  endTime: string;
  questions: {
    q: string;
    ans: string;
    _id: {
      $oid: string;
    };
  }[];
  __v: number;
}

const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [domainResponses, setDomainResponses] = useState<Response[]>([]);

  const fetchProfileData = async () => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      const profileResponse = await axios.get(
        `${process.env.BACKEND_URL}/admin/profile/${email}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProfileData(profileResponse.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const fetchDomainResponses = async (domain: string) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      const responseResponse = await axios.get(
        `${process.env.BACKEND_URL}/response/${email}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const filteredResponses = responseResponse.data.filter(
        (response: Response) => response.domain === domain
      );
      setDomainResponses(filteredResponses);
      setSelectedDomain(domain);
    } catch (error) {
      console.error("Error fetching domain responses:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[5vw]">
      <div className="mb-4 w-[50vw]">
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[40vw] px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={fetchProfileData}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Fetch Profile
        </button>
      </div>
      {profileData && (
        <div className="flex w-[80%]">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2 mr-4">
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <div className="mb-2">
              <span className="font-semibold">Student Name:</span>{" "}
              {profileData.Student_Name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Register Number:</span>{" "}
              {profileData.Register_Number}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email ID:</span>{" "}
              {profileData.EmailID}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Mobile No:</span>{" "}
              {profileData.Mobile_No}
            </div>
            <div className="mb-4">
              <span className="font-semibold">
                Domains (Clicking on domain field will display the responses):
              </span>
              <div className="ml-4">
                <div>
                  <span className="font-semibold">Tech:</span>{" "}
                  {profileData.Domains.tech.map((domain: string) => (
                    <button
                      key={domain}
                      onClick={() => fetchDomainResponses(domain)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                    >
                      {domain}
                    </button>
                  ))}
                </div>
                <div>
                  <span className="font-semibold">Design:</span>{" "}
                  {profileData.Domains.design.map((domain: string) => (
                    <button
                      key={domain}
                      onClick={() => fetchDomainResponses(domain)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                    >
                      {domain}
                    </button>
                  ))}
                </div>
                <div>
                  <span className="font-semibold">Management:</span>{" "}
                  {profileData.Domains.management.map((domain: string) => (
                    <button
                      key={domain}
                      onClick={() => fetchDomainResponses(domain)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <span className="font-semibold">Report:</span>
              <div className="ml-4">
                {Object.entries(profileData.Report).map(([domain, rounds]) => (
                  <div key={domain} className="mb-2">
                    <span className="font-semibold">{domain}:</span>
                    <div className="ml-4">
                      {typeof rounds === "object" && rounds !== null
                        ? Object.entries(rounds).map(([round, score]) => (
                            <div key={round}>
                              <span className="font-semibold">{round}:</span>{" "}
                              {score === 0 ? (
                                <span>Not Reviewed</span>
                              ) : score === 1 ? (
                                <span className="text-green-500">Accepted</span>
                              ) : (
                                <span className="text-red-500">Rejected</span>
                              )}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {selectedDomain && (
            <div className="bg-white p-6 rounded-md shadow-md w-1/2 h-[70vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Responses for {selectedDomain}
              </h2>
              {domainResponses.map((response, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Response {index + 1}
                  </h3>

                  <div className="mb-2">
                    <span className="font-semibold">Domain:</span>{" "}
                    {response.domain}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Start Time:</span>{" "}
                    {response.startTime}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Submission Time:</span>{" "}
                    {response.submissionTime}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">End Time:</span>{" "}
                    {response.endTime}
                  </div>
                  <div>
                    <span className="font-semibold">Questions:</span>
                    <div className="ml-4">
                      {response.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="mb-2">
                          <div className="font-semibold">
                            Question {questionIndex + 1}:
                          </div>
                          <div>{question.q}</div>
                          <div className="ml-4">
                            <span className="font-semibold">Answer:</span>{" "}
                            {question.ans}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
