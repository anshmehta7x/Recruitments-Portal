"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import ResponseDetails from "./ResponseDetails";
import Link from "next/link";
const Button = dynamic(() => import("@/components/button"), { ssr: false });

const Report: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [noneToBeDecided, setNoneToBeDecided] = useState<any[]>([]);
  const [accepted, setAccepted] = useState<any[]>([]);
  const [rejected, setRejected] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const fetchData = async (domain: string) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      const noneResponse = await axios.get(
        `${process.env.BACKEND_URL}/admin/round3/none/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const acceptedResponse = await axios.get(
        `${process.env.BACKEND_URL}/admin/round3/accepted/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const rejectedResponse = await axios.get(
        `${process.env.BACKEND_URL}/admin/round3/rejected/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNoneToBeDecided(noneResponse.data);
      setAccepted(acceptedResponse.data);
      setRejected(rejectedResponse.data);
      setSelectedDomain(domain);
    } catch (error) {
      toast.error("Error fetching data", {
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

  const openResponseDetails = (email: string) => {
    setSelectedEmail(email);
  };

  const closeResponseDetails = () => {
    fetchData(selectedDomain);
    setSelectedEmail("");
  };

  return (
    <div className="flex justify-between h-screen flex-wrap">
      <Link
          href="/admin/dashboard"
          className="absolute left-2 top-3  bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      <div className="flex flex-col items-start mr-10 w-[50%] h-[110vh] flex-wrap mt-[8%]">
        <Button onClick={() => fetchData("web")} text="Web" />
        <Button onClick={() => fetchData("aiml")} text="AIML" />
        <Button onClick={() => fetchData("app")} text="App" />
        <Button onClick={() => fetchData("devops")} text="DevOps" />
        <Button onClick={() => fetchData("research")} text="Research" />
        <Button onClick={() => fetchData("uiux")} text="UI/UX" />
        <Button onClick={() => fetchData("video")} text="Video" />
        <Button onClick={() => fetchData("graphic")} text="Graphic" />
        <Button
          onClick={() => fetchData("pnm")}
          text="Publicity and Marketing"
        />
        <Button onClick={() => fetchData("editorial")} text="Editorial" />
        <Button onClick={() => fetchData("events")} text="Events" />
      </div>
      <div className="flex flex-col items-center w-[35%] mt-[8%]">
        <div className="bg-white p-4 rounded-md mb-4 w-full max-h-[50vh] mr-[10vw] overflow-auto text-center">
          <h3 className="text-lg font-semibold mb-2">
            Current Domain :{" "}
            {selectedDomain.toUpperCase() || "No Domain Selected!"}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-md mb-4 w-full max-h-[50vh] mr-[10vw] overflow-auto">
          <h2 className="text-xl font-bold mb-2">
            None (to be decided) - {noneToBeDecided.length} responses{" "}
          </h2>
          {noneToBeDecided.map((item, index) => (
            <div
              key={index}
              onClick={() => openResponseDetails(item.EmailID)}
              className="cursor-pointer"
            >
              {item.EmailID}
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-md mb-4 w-full max-h-[50vh] mr-[10vw] overflow-auto">
          <h2 className="text-xl font-bold mb-2">
            Accepted - {accepted.length} responses{" "}
          </h2>
          {accepted.map((item, index) => (
            <div
              key={index}
              onClick={() => openResponseDetails(item.EmailID)}
              className="cursor-pointer"
            >
              {item.EmailID}
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-md w-full max-h-[50vh] mr-[10vw] overflow-auto">
          <h2 className="text-xl font-bold mb-2">
            Rejected - {rejected.length} responses{" "}
          </h2>
          {rejected.map((item, index) => (
            <div
              key={index}
              onClick={() => openResponseDetails(item.EmailID)}
              className="cursor-pointer"
            >
              {item.EmailID}
            </div>
          ))}
        </div>
      </div>
      {selectedEmail && (
        <ResponseDetails
          email={selectedEmail}
          onClose={closeResponseDetails}
          domain={selectedDomain}
        />
      )}
    </div>
  );
};

export default Report;
