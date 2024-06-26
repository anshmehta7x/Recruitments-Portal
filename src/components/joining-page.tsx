"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import Button from "./button";
import Header from "./header";
import SubHeader from "./subdomain-header";
import { PutDomains } from "@/api";
import { Bounce, toast } from "react-toastify";

const dropdownVariants = {
  key: "div",
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { type: "spring", bounce: 0.35 },
  },
  exit: {
    scaleY: 0,
    transition: { when: "afterChildren" },
  },
  transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
};

export default function JoinTeam(props: {
  teamName: string;
  order: string;
  titles: string[];
  selectedDomains: string[];
}) {
  const { emailValue, accessToken } = useContext(AuthContext);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    props.selectedDomains
  );
  const [isShown, setIsShown] = useState(false);

  const onClick = (teamName: string) => {
    setIsShown(!isShown);
    if (typeof window !== "undefined") {
      if (!isShown) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
    }
  };
  const setTitle = (title: string) => {
    title = title.toLowerCase();
    if (title === "ai/ml") return "aiml";
    else if (title === "ui/ux") return "uiux";
    else if (title === "graphic design") return "graphic";
    else if (title === "publicity and marketing") return "pnm";
    else return title;
  };
  const handleClick = (props: { title: string }) => {
    props.title = setTitle(props.title);
    setSelectedDomains((prevSelected: string[]) => {
      if (prevSelected.includes(props.title)) {
        if (typeof window !== "undefined") {
          const element = document.getElementById(props.title);
          if (element) {
            element.classList.remove("text-main-pink");
            element.classList.add("text-white");
          }
          return prevSelected.filter((item) => item !== props.title);
        }
      }
      if (prevSelected.length === 2) {
        return prevSelected;
      } else {
        if (typeof window !== "undefined") {
          const element = document.getElementById(props.title);
          if (element) {
            element.classList.remove("text-white");
            element.classList.add("text-main-pink");
          }
        }
        return [...prevSelected, props.title];
      }
    });
  };
  useEffect(() => {
    setIsShown(false);
    document.body.style.overflow = "auto";
  }, []);
  return (
    <>
      <div
        className={`flex ${
          props.order === "1"
            ? "flex-col md:flex-row"
            : "flex-col md:flex-row-reverse"
        }  justify-evenly items-center h-screen w-full`}
      >
        <Header title={props.teamName} />
        <Button
          text="JOIN THE TEAM"
          onClick={() => {
            onClick(props.teamName);
          }}
        />
      </div>
      <AnimatePresence>
        {isShown && (
          <motion.div
            {...dropdownVariants}
            className="w-full h-screen bg-main-bg inset-0 flex  flex-col justify-around items-center fixed z-40 origin-top pb-10 md:pb-0"
          >
            <div className="w-[95%] h-[70%] flex flex-row  justify-evenly items-center flex-wrap gap-x-[14%] ">
              {props.titles.map((title) => (
                <motion.div
                  className="hover:cursor-pointer z-0"
                  key={title}
                  onClick={() => {
                    handleClick({ title });
                  }}
                >
                  <SubHeader
                    title={title}
                    id={setTitle(title)}
                    selected={selectedDomains}
                  />
                </motion.div>
              ))}
            </div>
            <div
              className={
                "flex flex-col items-center text-main-pink font-sarpanch text-2xl mb-2"
              }
            >
              <h1 className={"mb-2"}>Select any 2 subdomains</h1>
              <h1 className={"mb-2 text-center"}>
                No changes in domain after you attempt quiz
              </h1>
              <Button
                text="CONFIRM"
                onClick={() => {
                  onClick(props.teamName);
                  if (emailValue === undefined || accessToken === undefined) {
                    toast.error("Please login and try", {
                      position: "bottom-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                    });
                  } else {
                    PutDomains(
                      selectedDomains,
                      props.teamName,
                      emailValue,
                      accessToken
                    );
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
