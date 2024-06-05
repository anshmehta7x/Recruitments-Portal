"use client";
import { Suspense, useContext, useEffect } from "react";
import Loading from "../components/loading";
import { AuthContext } from "@/contexts/auth.context";
import Hero from "@/components/hero";
import ScrollIndicator from "@/components/scrollindicator";
import Welcome from "@/components/welcome";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { GetDomains } from "@/api";

export default function Home() {
  const router = useRouter();
  const {
    setCookieEmailValue,
    setCookieAccessToken,
    setResponseData,
    responseData,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!router) return;
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    const checkCookie = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email"))
        ?.split("=")[1];
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken"))
        ?.split("=")[1];
      if (cookieValue && accessToken) {
        setCookieEmailValue(cookieValue);
        setCookieAccessToken(accessToken);
        const fetchData = async () => {
          const data = await GetDomains(cookieValue, accessToken);
          setResponseData(data);
        };
        fetchData();
      } else {
        // Not logged in
        router.push("/login");
      }
    };

    checkCookie();
  }, []);

  return (
    <>
      <main className="px-2 min-h-screen overflow-y-scroll">
        <Suspense fallback={<Loading />}>
          <div className="snap-center h-screen">
            <Hero />
          </div>
          <div className="hidden md:visible snap-center h-screen">
            <Welcome />
          </div>
          <div className="snap-center h-[50vh] flex items-center justify-center">
            <Button
              text={"Check Round 3 Results"}
              onClick={() => router.push("/events")}
            />
          </div>
        </Suspense>
      </main>
      <ScrollIndicator />
    </>
  );
}
