import axios from "axios";
import { useEffect, useState } from "react";

export default function GroupDiscussion(props) {
  const emailValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("email"))
    ?.split("=")[1];
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  const [domain, setDomain] = useState<string>(props.domain);
  const [teamNum, setTeamNum] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `${process.env.BACKEND_URL}/round2/teamDetails/${domain}/${emailValue}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        setTeamNum(data.teamName);
        setDate(data.date);
        setTime(data.time);
        setMeetingLink(data.meetLink);
      });
  }, [domain]);

  return (
    <div className="h-[45vh] w-[90%] max-w-[600px] p-5 text-xl resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-40 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible my-auto flex items-center flex-col gap-3 font-bold ">
      <p className="font-striger sm:text-3xl text-lg text-main-pink">
        Group Discussion Schedule
      </p>
      <p>Team No. {teamNum}</p>
      <p>Date : {date}</p>
      <p>Time : {time}</p>
      <p>
        Venue :{" "}
        <a href={meetingLink} target="_blank">
          {meetingLink}
        </a>
      </p>
    </div>
  );
}
