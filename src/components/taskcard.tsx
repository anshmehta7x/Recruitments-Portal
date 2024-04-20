export default function Taskcard(props: {
  domain: string;
  subDomain: string;
  completed: boolean;
}) {
  function StartQuiz(subDomain: any) {
    // const emailValue = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('email'))
    //     ?.split('=')[1];
    // const accessToken = document.cookie
    //     .split('; ')
    //     .find(row => row.startsWith('accessToken'))
    //     ?.split('=')[1];
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
    <div className="py-3 px-5 h-[20vh] md:h-[25vh] md:w-[25vw] border-[#6117AB] bg-[rgba(82,36,129,0.3)] border-4 mx-3 rounded-2xl flex flex-col justify-between my-5 md:my-0">
      <div>
        <h1 className="font-sarpanch text-white font-bold underline text-xl">
          {props.domain}
        </h1>
        <br></br>
        <h2 className="font-sarpanch text-white text-xl">
          {setSubDomain(props.subDomain)}
        </h2>
      </div>
      <label
        // Uncomment when quizzes are live
        className={`${
          props.completed ? "text-main-pink" : "text-white"
        } font-sarpanch bg-[#6117AB] w-[25vw] text-center md:w-[10vw] rounded-lg p-2 self-end`}
      >
        {/* {"Quiz will be updated soon"} */}
        {/*// Uncomment when quizzes are live*/}
        {!props.completed ? "Pending" : "Completed"}
      </label>
    </div>
  );
}
