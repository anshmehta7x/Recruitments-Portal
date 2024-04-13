import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

export default function Quizcard(props: {
  domain: string;
  subDomain: string;
  completed: boolean;
}) {
  const router = useRouter();
  const { emailValue, accessToken } = useContext(AuthContext);
  function StartQuiz(subDomain: any) {
    // const emailValue = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('email'))
    //     ?.split('=')[1];

    // const accessToken = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('accessToken'))
    //     ?.split('=')[1];

    axios
      .post(
        `https://recruitments-portal-backend.vercel.app/question/${subDomain.toLowerCase()}/${emailValue}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // handle the response here
        localStorage.setItem("questions", JSON.stringify(response.data));
        localStorage.setItem("domain", JSON.stringify(subDomain.toLowerCase()));
        router.push("/quiz/");
      })
      .catch((error) => {
        // handle the error here
      });
  }
  const setSubDomain = (subDomain: string) => {
    if (subDomain === "pnm") return "Publicity and Marketing";
    if (subDomain === "web") return "Web Dev";
    if (subDomain === "app") return "App Dev";
    if (subDomain === "graphic") return "Graphic Design";
    if (subDomain === "research") return "Research";
    if (subDomain === "events") return "Events";
    if (subDomain === "video") return "Video Editing";
    if (subDomain === "devops") return "DevOps";
    if (subDomain === "uiux") return "UI/UX";
    if (subDomain === "editorial") return "Editorial";
    if (subDomain === "aiml") return "AI/ML";
    return subDomain;
  };
  return (
    <div className="p-5 md:h-[30vh] md:min-w-[19.5vw] border-[#6117AB] bg-[rgba(82,36,129,0.3)] border-4 mx-5 rounded-2xl flex flex-col my-5 md:my-0">
      <h1 className="font-sarpanch text-white font-bold underline text-xl">
        {props.domain}
      </h1>
      <br></br>
      <h2 className="font-sarpanch text-white text-xl">
        {setSubDomain(props.subDomain)}
      </h2>
      <button
        // Uncomment when quizzes are live
        onClick={() => {
          !props.completed ? StartQuiz(props.subDomain) : null;
        }}
        className="font-sarpanch bg-[#6117AB] text-white rounded-lg p-2 mt-5"
      >
        {/* {"Quiz will be updated soon"} */}
        {/*// Uncomment when quizzes are live*/}
        {!props.completed ? "Start Quiz" : "Completed"}
      </button>
    </div>
  );
}
