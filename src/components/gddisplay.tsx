import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";
export default function GroupDiscussion(props: any) {
  const emailValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("email"))
    ?.split("=")[1];
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState<string>(props.domain);
  const [teamNum, setTeamNum] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");

  const [isResult, setIsResult] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
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
        console.log(data);

        if (domain === "pnm") {
          setIsResult(true);
          setIsSelected(data.isSelected);
          setLoading(false);
        } else {
          setTeamNum(data[0].teamName);
          setDate(data[0].date);
          setTime(data[0].time);
          setMeetingLink(data[0].meetLink);
          setLoading(false);
        }
      });
  }, [domain]);

  return (
    <div className="h-[45vh] w-[90%] max-w-[600px] p-5 text-xl resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-40 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible my-auto flex items-center flex-col gap-3 font-bold ">
      <Loader visibility={loading} />
      {!isResult ? (
        <div>
          <p className="font-striger sm:text-3xl text-lg text-main-pink">
            Group Discussion Schedule
          </p>
          <p>Date : {date}</p>
          <p>Time : {time}</p>
          <p>
            Meet Link :
            <a href={meetingLink} target="_blank">
              {meetingLink}
            </a>
          </p>
        </div>
      ) : (
        <div>
          {isSelected ? (
            <p className="font-striger sm:text-3xl text-lg text-main-pink">
              Congratulations! You have been selected in this domain.
            </p>
          ) : (
            <p className="font-striger sm:text-3xl text-lg text-main-pink">
              Welcome to IEEE-CS. Join our discord for updates.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
