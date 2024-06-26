"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SubHeader = (props: {
  title: string;
  id: string;
  selected: string[];
}) => {
  const Ref = useRef(null);
  const inView = useInView(Ref, { amount: 0.5, once: true });
  const animationOnViewLeft = {
    hidden: {
      scaleX: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
      },
    },
  };
  const animationOnViewRight = {
    hidden: {
      scaleX: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
      },
    },
  };
  return (
    <motion.div
      className={`flex flex-col justify-evenly ${
        props.selected.includes(props.id) ? "text-main-pink" : "text-white"
      } font-striger w-max min-w-[346px] z-20`}
      ref={Ref}
      id={props.id}
    >
      <div className="flex flex-row justify-between">
        <motion.span
          variants={animationOnViewLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-top-left.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-right md:block hidden"
        ></motion.span>
        <span className="lg:text-4xl sm:text-4xl text-2xl md:block hidden">
          The
        </span>
        <motion.span
          variants={animationOnViewRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-top-right.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-left md:block hidden"
        ></motion.span>
      </div>
      <div className="lg:text-6xl sm:text-5xl text-3xl mx-auto">
        {props.title}
      </div>
      <div className="flex flex-row md:justify-between justify-center">
        <motion.span
          variants={animationOnViewLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-bottom-left.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-right md:block hidden"
        ></motion.span>
        <span className="lg:text-4xl sm:text-4xl text-2xl">Team</span>
        <motion.span
          variants={animationOnViewRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-bottom-right.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-left md:block hidden"
        ></motion.span>
      </div>
    </motion.div>
  );
};

export default SubHeader;
