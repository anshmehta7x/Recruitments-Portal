"use client";

import Button from "@/components/button";
import Question from "@/components/quiz/Question";
import QuestionNumberButton from "@/components/quiz/QuestionNumberButton";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { redirect } from "next/navigation";
import { AuthContext } from "@/contexts/auth.context";
const Page = () => {
  const { emailValue, accessToken } = useContext(AuthContext);
  if (!emailValue || !accessToken) {
    redirect("/login");
  }
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [ansArr, setAnsArr] = useState<string[]>([]);
  // const arr = new Array(10).fill(0);
  const [arr, setArr] = useState<number[]>([]);

  const questionsArray = arr.map((_, idx) => (
    <QuestionNumberButton
      key={idx}
      qNo={idx + 1}
      questionNumber={questionNumber}
      setQuestionNumber={setQuestionNumber}
    />
  ));
  useEffect(() => {
    const q = JSON.parse(localStorage.getItem("questions") || "[]");
    setAnsArr(Array(q.length).fill(""));
    setArr(Array(q.length).fill(0));
  }, []);

  return (
    <main className="min-h-screen text-white mx-10 sm:mx-20 flex flex-col justify-center py-10 pt-32">
      {questionsArray.length === 0 ? (
        <div className="flex flex-col gap-10 mt-10">
          <h1 className="text-center font-striger text-5xl">
            No questions found
          </h1>
          <div className=" flex justify-center items-center mb-36">
            <Link href="/quizzes">
              <Button text="Go to Quiz Dashboard" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Question
            questionNumber={questionNumber}
            ansArr={ansArr}
            setAnsArr={setAnsArr}
            setQuestionNumber={setQuestionNumber}
          />
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 text-center gap-4">
            {questionsArray}
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
