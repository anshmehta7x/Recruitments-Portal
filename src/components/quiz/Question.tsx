"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../loader";

interface OptionProps {
  text: string;
  ansArr: string[];
  setAnsArr: React.Dispatch<React.SetStateAction<string[]>>;
  questionNumber: number;
}

interface answerFormat {
  q: string;
  ans: string;
}

interface OptionData {
  _id: string;
  question: string;
  type: string;
  options: string[];
}

const Option = ({ text, ansArr, setAnsArr, questionNumber }: OptionProps) => {
  return (
    <li
      className={`p-2 bg-[#522481] bg-opacity-50 rounded-xl backdrop-blur-sm border-main-blue border-2 ${
        text === ansArr[questionNumber - 1]
          ? "border-4 border-main-pink"
          : "border-2"
      } my-6 cursor-pointer`}
      onClick={() => {
        setAnsArr((prev: string[]) => {
          const newArr = [...prev];
          newArr[questionNumber - 1] = text;
          return newArr;
        });
      }}
    >
      {text}
    </li>
  );
};

interface QuestionProps {
  questionNumber: number;
  ansArr: string[];
  setAnsArr: React.Dispatch<React.SetStateAction<string[]>>;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

interface QuestionData {
  question: string;
  options?: string[];
}

const Question = ({
  questionNumber,
  ansArr,
  setAnsArr,
  setQuestionNumber,
}: QuestionProps) => {
  const router = useRouter();
  const [option, setOption] = useState<number>(1);
  const [round1, setRound1] = useState<OptionData[]>([]);
  const question: QuestionData = round1[questionNumber - 1];
  const [loading, setLoading] = useState<boolean>(false);

  const options = question?.options?.map((option, idx) => (
    <Option
      key={idx}
      text={option}
      setAnsArr={setAnsArr}
      ansArr={ansArr}
      questionNumber={questionNumber}
    />
  ));
  useEffect(() => {
    setRound1(JSON.parse(localStorage.getItem("questions") || "[]"));
  }, []);

  const sendData = () => {
    const emailValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email"))
      ?.split("=")[1];
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];
    const anwArray: answerFormat[] = [];
    for (let i = 0; i < ansArr.length; i++) {
      anwArray.push({
        q: round1[i].question,
        ans: ansArr[i],
      });
    }
    setLoading(true);
    axios
      .patch(
        `${process.env.BACKEND_URL}/response/submit`,
        {
          email: emailValue,
          domain: JSON.parse(localStorage.getItem("domain") || "").toString(),
          questions: anwArray,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((_) => {
        setLoading(false);
        localStorage.removeItem("domains");
        router.push("/quizzes");
      })
      .catch((error) => {
        throw error;
      });
  };
  return (
    <div className="QnA">
      <h1 className="font-bold font-sarpanch tracking-wider text-xl md:text-2xl">
        {round1[questionNumber - 1]?.question}
      </h1>
      {round1[questionNumber - 1]?.options.length !== 0 ? (
        options
      ) : (
        <Input
          setAnsArr={setAnsArr}
          ansArr={ansArr}
          questionNumber={questionNumber}
        />
      )}
      <div className="flex justify-between mx-8 my-4 font-striger text-lg">
        <button
          disabled={questionNumber === 1}
          onClick={() => {
            setQuestionNumber((prev: number) => prev - 1);
          }}
        >
          prev
        </button>
        {questionNumber !== ansArr.length ? (
          // change this to array length
          <button
            disabled={questionNumber === 10}
            onClick={() => {
              setQuestionNumber((prev: number) => prev + 1);
            }}
          >
            next
          </button>
        ) : (
          <button
            onClick={() => {
              // send data to server
              sendData();
            }}
          >
            Submit
          </button>
        )}
      </div>
      <Loader visibility={loading} />
    </div>
  );
};

export default Question;
