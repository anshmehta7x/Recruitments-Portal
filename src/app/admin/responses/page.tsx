"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import ResponseDetails from "./ResponseDetails";
import { Bounce, toast } from "react-toastify";

const Button = dynamic(() => import("@/components/button"), { ssr: false });

const StudentResponses: React.FC = () => {
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomainl] = useState<string>("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const accessTokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];
      if (!accessTokenValue) {
        window.location.href = "/admin";
        return;
      }
      setShow(true);
    } catch (error) {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    try {
      const accessTokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];
      if (!accessTokenValue) {
        window.location.href = "/admin";
        return;
      }
      setShow(true);
    } catch (error) {
      window.location.href = "/admin";
    }

    if (!show) {
      return;
    }

    fetchData("web");
  }, [show]);

  const fetchData = async (domain: string) => {
    try {
      const emailValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email"))
        ?.split("=")[1];

      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      const response = await axios.get(
        `https://recruitments-portal-backend.vercel.app/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setResponses(response.data);
      setSelectedDomainl(domain);
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

  const handleEmailClick = (email: string) => {
    setSelectedEmail(email);
  };

  const handleCloseDetails = () => {
    fetchData(selectedDomain);
    setSelectedEmail(null);
  };
  return (
    <>
      <button className="text-white border-2 border-white top-5 left-5 fixed p-5">
        Back
      </button>
      <div className="flex justify-between h-screen flex-wrap">
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
        <div className="overflow-y-auto h-[80vh] max-h-96 w-[35%] bg-gray-100 p-4 rounded-md  mt-[8%] mx-auto">
          <h2 className="text-xl font-bold mb-4 ">Responses</h2>
          <div>
            {responses.slice(0, 10).map((response, index) => (
              <div key={index} className="mb-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleEmailClick(response.EmailID)}
                >
                  {response.EmailID}
                </button>
              </div>
            ))}
          </div>
        </div>
        {selectedEmail && (
          <ResponseDetails
            email={selectedEmail}
            domain={selectedDomain}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </>
  );
};

export default StudentResponses;
