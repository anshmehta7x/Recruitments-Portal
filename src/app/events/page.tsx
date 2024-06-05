"use client";
import axios from "axios";
import { Console } from "console";
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
        <div className="h-[45vh] w-[90%] max-w-[600px] p-5 text-xl resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-40 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible my-auto flex items-center flex-col gap-3 font-bold ">
          <div>
            <p className="font-striger sm:text-3xl text-lg text-main-pink text-center mb-4">
              Welcome to IEEE-CS Outer Core Committee
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
