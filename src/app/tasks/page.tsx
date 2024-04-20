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
  const [domain, setDomain] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const domain = params.get("domain");
    if (!domain) {
      router.push("/quizzes");
    }
    setDomain(domain);
  }, []);

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
        <TaskDisplay />
      </div>
      <Button text="Submit" />
    </div>
  );
}
