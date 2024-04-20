"use client";
import SubHeader from "@/components/subdomain-header";
import GroupDiscussion from "@/components/gddisplay";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TaskDisplay from "@/components/taskdisplay";
import { redirect, useSearchParams } from "next/navigation";
import Button from "@/components/button";
import { Suspense, useEffect, useState } from "react";

export default function Tasks() {
  const router = useRouter();
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const domain = params.get("domain");
    if (!domain) {
      router.push("/quizzes");
    } else {
      setDomain(domain);
    }
  }, [router]);

  const checkDomain = (domain: string | null) => {
    if (!domain) return false;
    const tasks = ["uiux", "web", "app", "graphic", "video", "devops", "aiml"];
    const gd = ["pnm", "events", "editorial"];
    return tasks.includes(domain)
      ? true
      : gd.includes(domain)
      ? false
      : router.push("/quizzes");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between p-4">
      <button onClick={() => router.back()}>
        <Image
          src="/back-button.svg"
          alt="logo"
          width={50}
          height={50}
          className="absolute sm:top-[30px] sm:left-[30px] top-[10px] left-[10px]"
        />
      </button>
      <div className="flex flex-row items-center justify-center ">
        <div className="w-1/4 h-auto">
          <Image
            src="/graphics/left-lines.svg"
            alt="left-lines"
            width={500}
            height={100}
          />
        </div>
        <h2 className="text-4xl md:text-7xl text-center text-white mx-5 font-striger">
          {domain}
        </h2>
        <div className="w-1/4 h-auto">
          <Image
            src="/graphics/right-lines.svg"
            alt="right-lines"
            width={500}
            height={100}
          />
        </div>
      </div>
      <div className="w-[90vw] h-[60vh] flex flex-col items-center justify-between gap-1">
        {checkDomain(domain) ? <TaskDisplay /> : <GroupDiscussion />}
      </div>
      <div className="sm:m-0 mb-2">
        <Button text="Submit" />
      </div>
      <button onClick={() => router.push("/faq")}>
        <Image
          src="/know-more.svg"
          alt="logo"
          width={50}
          height={50}
          className="absolute top-[10px] right-[10px] sm:top-[90vh] sm:right-[70px] "
        />
      </button>
    </div>
  );
}
