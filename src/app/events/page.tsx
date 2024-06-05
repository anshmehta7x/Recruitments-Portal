"use client";
import Button from "@/components/button";
import axios from "axios";
import { useState, useEffect } from "react";

interface Events {
  domain: string;
  teamName: string;
  date: string;
  time: string;
  meetLink: string;
}
export default function EventsPage() {
  const [event, setEvent] = useState<Events>();
  const [error, setError] = useState(null);
  const [hasEvent, setHasEvent] = useState(true);

  const fetchDetail = async () => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email"))
      ?.split("=")[1];
    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}/round2/teamDetails/round3/events/${email}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res.data.message);

      if (res.status === 200) {
        setEvent(res.data[0]);
        console.log(res.data[0]);
      } else {
        throw new Error(`Request failed with status ${res.data}`);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setHasEvent(false);
        return;
      }
      console.log(error);

      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (error) {
    return (
      <div className="my-[45vh] absolute mx-[45vw] w-[300px] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {hasEvent ? (
        <div className="h-[45vh] w-[90%] max-w-[600px] p-5 text-xl resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-40 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible my-auto flex items-center flex-col gap-3 font-bold ">
          {event ? (
            <div>
              <div>
                <p className="font-striger sm:text-3xl text-lg text-main-pink text-center mb-4">
                  Details
                </p>
                <p>Date : {event.date}</p>
                <p>Time : {event.time}</p>
                <p>
                  Meet Link :
                  <a href={event.meetLink} target="_blank">
                    {event.meetLink}
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-evenly items-center w-full min-h-screen pt-[15vh] font-striger text-3xl text-center md:text-5xl">
          <h1 className="text-main-pink">
            Welcome to IEEE-CS OUTER CORE COMMITTEE
          </h1>
          <h2 className="text-white">
            Join our discord server to stay updated
          </h2>
          <Button
            text="Join Discord"
            onClick={() => {
              window.open("https://discord.gg/vR7Q6rDAQB");
            }}
          />
        </div>
      )}
    </div>
  );
}
