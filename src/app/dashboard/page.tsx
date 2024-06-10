"use client";

import Taskcard from "@/components/taskcard";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Button from "@/components/button";

export default function Page() {
  type Round3ResultType = {
    domain: string;
    round3Result: string;
  };

  const [round3Results, setRound3Results] = useState<Round3ResultType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email"))
      ?.split("=")[1];
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];

    axios
      .get(`${process.env.BACKEND_URL}/round3/get_details/${cookieValue}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setRound3Results(response.data.round3);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function getMainDomain(domain: string) {
    if (domain === "pnm" || domain === "events") {
      return "Management";
    } else if (
      domain === "web" ||
      domain === "app" ||
      domain === "devops" ||
      domain === "aiml"
    ) {
      return "Technical";
    } else {
      return "Design";
    }
  }

  const pendingResults = round3Results.filter(
    (result) => result.round3Result === "Pending"
  );
  const acceptedResults = round3Results.filter(
    (result) => result.round3Result === "Accepted"
  );
  const rejectedResults = round3Results.filter(
    (result) => result.round3Result === "Rejected"
  );

  return (
    <>
      <Loader visibility={loading} />
      {round3Results.length > 0 ? (
        <div className="flex flex-col items-center w-full min-h-screen pt-[15vh]">
          <section className="flex flex-col font-striger text-center text-2xl md:text-4xl mb-[5vh]">
            <h1 className="text-main-pink">Round 3 Results</h1>
          </section>

          {acceptedResults.length > 0 && (
            <section className="flex flex-col w-full px-[5vw] md:mb-5">
              <h1 className="font-striger text-4xl text-white">
                Accepted Results
              </h1>
              <div className="flex items-center justify-center w-full px-8">
                <section className="flex flex-col md:grid md:grid-cols-3 md:gap-8 w-full my-2 pb-2">
                  {acceptedResults.map((result, index) => (
                    <Taskcard
                      domain={getMainDomain(result.domain)}
                      subDomain={result.domain}
                      completed={true}
                      key={index}
                    />
                  ))}
                </section>
              </div>
            </section>
          )}

          <section className="flex flex-col w-full px-[5vw] md:mb-5">
            <h1 className="font-striger text-4xl text-white">
              Pending Results
            </h1>
            <div className="flex items-center justify-center w-full px-8">
              <section className="flex flex-col md:grid md:grid-cols-3 md:gap-8 w-full my-2 pb-2">
                {pendingResults.map((result, index) => (
                  <Taskcard
                    domain={getMainDomain(result.domain)}
                    subDomain={result.domain}
                    completed={false}
                    key={index}
                  />
                ))}
              </section>
            </div>
          </section>

          <section className="flex flex-col w-full px-[5vw] md:mb-5">
            <h1 className="font-striger text-4xl text-white">
              Rejected Results
            </h1>
            <div className="flex items-center justify-center w-full px-8">
              <section className="flex flex-col md:grid md:grid-cols-3 md:gap-8 w-full my-2 pb-2">
                {rejectedResults.map((result, index) => (
                  <Taskcard
                    domain={getMainDomain(result.domain)}
                    subDomain={result.domain}
                    completed={true}
                    key={index}
                  />
                ))}
              </section>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col justify-evenly items-center w-full min-h-screen pt-[15vh] font-striger text-3xl text-center md:text-5xl">
          <h1 className="text-main-pink">Welcome to IEEE-CS CORE COMMITTEE</h1>
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
    </>
  );
}
