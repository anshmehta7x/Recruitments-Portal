"use client";
import SubHeader from "@/components/subdomain-header";
import GroupDiscussion from "@/components/gddisplay";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TaskDisplay from "@/components/taskdisplay";
import { redirect, useSearchParams } from "next/navigation";
import Button from "@/components/button";
import { useEffect } from "react";

interface TasksProps {
  title: string;
}

export default function Tasks({ title }: TasksProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");
  if (domain == null) {
    redirect("/quizzes");
  }
  console.log(domain);
  // check if subdomain part of management domain -> show groupDiscussion
  // fetch data and authenticate
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between p-4">
      <button onClick={() => router.back()}>
        <Image
          src="/back-button.svg"
          alt="logo"
          width={50}
          height={50}
          className="absolute top-[30px] left-[30px]"
        />
      </button>
      <SubHeader title={domain} id="tasks" selected={["string"]} />
      <div className="w-[90vw] h-[60vh] flex flex-col items-center justify-between gap-1">
        {/* <GroupDiscussion /> // for management domains */}
        <TaskDisplay /> // for individual domains
      </div>
      <Button text="Submit" />
    </div>
  );
}
