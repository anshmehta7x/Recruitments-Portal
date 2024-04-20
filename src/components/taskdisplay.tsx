import { useState } from "react";

export default function TaskDisplay() {
  const [attempt, setAttempt] = useState(false);
  return (
    <>
      <div className="h-[35vh] w-full p-5 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px] rounded-xl  text-start text-white overflow-visible">
        <select
          name="level"
          id="level"
          defaultValue={"easy"}
          className="bg-main-blue text-[#F7AB31]  px-4 rounded-xl text-center absolute top-0 right-[50%] translate-x-[50%] translate-y-[-50%] z-10"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="overflow-auto h-[90%]"></div>
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
        <div className="w-full">
          <input
            type="text"
            placeholder="Github Repository"
            className="w-full p-5 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px] my-2  rounded-xl text-start text-white overflow-auto"
          />
          <input
            type="text"
            placeholder="Other Links"
            className="w-full p-5 text-lg resize-none shadow-3xl border-main-blue border-2  bg-main-blue bg-opacity-50 backdrop-blur-[2px]  rounded-xl text-start text-white overflow-auto"
          />
        </div>
      )}
    </>
  );
}
