"use client";
import JoinTeam from "@/components/joining-page";
import ScrollIndicator from "@/components/scrollindicator";
import Button from "@/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetDomains } from "@/api";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export default function Teams() {
  const router = useRouter();
  useEffect(() => {
    if (!router) return;
  }, [router]);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>({});

  function isAnyTaskCompleted(data: any) {
    for (const domain in data) {
      if (data.hasOwnProperty(domain)) {
        const domainTasks = data[domain];
        for (const task of domainTasks) {
          if (task.completed) {
            return true;
          }
        }
      }
    }
    return false;
  }

  useEffect(() => {
    const emailValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email"))
      ?.split("=")[1];
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];
    if (!emailValue || !accessToken) {
      redirect("/login");
    }
    const fetchData = async () => {
      setLoading(true);
      if (!emailValue || !accessToken) {
        toast.error("Email or Access Token not found in cookies", {
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

        setLoading(false);
        return;
      } else {
        if (localStorage.getItem("domains")) {
          if (
            isAnyTaskCompleted(
              JSON.parse(localStorage.getItem("domains") || "{}")
            )
          ) {
            toast.success("Cannot switch domains now.", {
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
            router.push("/dashboard");
          }
          setData(JSON.parse(localStorage.getItem("domains") || "{}"));
          setLoading(false);
          return;
        } else {
          const data = await GetDomains(emailValue, accessToken);
          setData(data);
          if (isAnyTaskCompleted(data)) {
            toast.success("Cannot switch domains now.", {
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
            router.push("/dashboard");
          }
          localStorage.setItem("domains", JSON.stringify(data));
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      {loading ? (
        <Loader visibility={true} />
      ) : (
        <>
          <JoinTeam
            teamName="Management"
            order="1"
            titles={["Publicity and Marketing", "Editorial", "Events"]}
            selectedDomains={
              data.management?.map((item: any) => item.subdomain) || []
            }
          />
          <JoinTeam
            teamName="Tech"
            order="2"
            titles={["App", "Web", "AI/ML", "Research", "DevOps"]}
            selectedDomains={
              data.tech?.map((item: any) => item.subdomain) || []
            }
          />
          <JoinTeam
            teamName="Design"
            order="1"
            titles={["UI/UX", "Graphic Design", "Video"]}
            selectedDomains={
              data.design?.map((item: any) => item.subdomain) || []
            }
          />
          <div className=" flex justify-center items-center mb-36">
            <Link href="/dashboard">
              <Button text="Go to Dashboard" />
            </Link>
          </div>
          <ScrollIndicator />
        </>
      )}
    </main>
  );
}
