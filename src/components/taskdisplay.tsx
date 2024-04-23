import { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { GetTasks, SubmitTask } from "@/api";
import EmblaCarousel from "./taskCarousel/taskcarousel";
import Button from "./button";
import SuccessToast, { ErrorToast } from "../components/toast";
import { answerFormat } from "@/api";
import { connectStorageEmulator } from "firebase/storage";
import { Bounce, toast } from "react-toastify";

interface questions {
  easy: string[];
  medium: string[];
  hard: string[];
}

export default function TaskDisplay({ domain }: { domain: string }) {
  const [attempt, setAttempt] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [tasks, setTasks] = useState<questions>();
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState<answerFormat>({
    domain: "",
    question: "",
    difficulty: "",
    link1: "",
    link2: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks: questions = await GetTasks(domain);
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    };
    if (sessionStorage.getItem("tasks")) {
      setTasks(JSON.parse(sessionStorage.getItem("tasks")!));
    }
    fetchTasks();
  }, []);

  const getSlides = () => {
    if (!tasks) return ["No tasks found, Kindly refersh the page."];
    switch (difficulty) {
      case "easy":
        return tasks["easy"];
      case "medium":
        return tasks["medium"].length > 0
          ? tasks["medium"]
          : ["No Medium tasks found"];
      case "hard":
        return tasks["hard"].length > 0
          ? tasks["hard"]
          : ["No Hard tasks found"];
      default:
        return [];
    }
  };

  const submitTasks = async () => {
    if (input.link1 === "") {
      ErrorToast({ message: "Please add atleast one link" });
      return;
    }
    const response = await SubmitTask({
      ...input,
      question: question,
      domain: domain,
      difficulty: difficulty,
    });
    if (response) {
      //clear inputs
      console.log(response);
      toast.success("Submitted Task.", {
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
      setInput({ ...input, link1: "", link2: "" });
    } else {
      toast.error("Error in submitting task", {
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
    }

  };

  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = getSlides();

  return (
    <>
      <div className="h-[35vh] w-full p-4 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible">
        <select
          name="level"
          id="level"
          defaultValue={"easy"}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-main-blue text-[#F7AB31]  px-4 rounded-xl text-center absolute top-0 right-[50%] translate-x-[50%] translate-y-[-50%] z-10"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="overflow-auto  w-full h-[99%]">
          <EmblaCarousel
            slides={SLIDES}
            options={OPTIONS}
            questionNo={setQuestion}
          />
        </div>
        <button
          className="bg-[#F7AB31] text-main-blue  px-4 rounded-xl text-center absolute bottom-0 right-[50%] translate-x-[50%] translate-y-[50%] z-10"
          onClick={() => {
            setAttempt(!attempt);
          }}
        >
          Attempt
        </button>
      </div>

      {attempt && (
        <div className="w-full flex flex-col items-center gap-2 mt-1">
          <input
            type="text"
            id="github"
            placeholder="Github Repository"
            className="w-full p-5 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px] my-2  rounded-xl text-start text-white overflow-auto"
            onChange={(value) => {
              setInput({
                ...input,
                link1: value.target.value,
              });
            }}
          />
          <input
            type="text"
            id="otherLinks"
            placeholder="Other Links"
            className="w-full p-5 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px]  rounded-xl text-start text-white overflow-auto"
            onChange={(value) => {
              setInput({
                ...input,
                link2: value.target.value,
              });
            }}
          />
          <div className="sm:m-0 mb-2 ">
            <Button text="Submit" onClick={submitTasks} />
          </div>
        </div>
      )}
    </>
  );
}
