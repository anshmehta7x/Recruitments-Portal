"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import "./hamburger.css";
import { HamNavLink, HamNavLinkLogout, Navlink } from "../navlink";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const dropdownVariants = {
  key: "div",
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { type: "spring", bounce: 0.15 },
  },
  exit: {
    scaleY: 0,
    transition: { when: "afterChildren" },
  },
  transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
};

export default function Nav() {
  const [isShown, setIsShown] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  function handleSignout() {
    document.cookie = "email=; path=/";
    document.cookie = "accessToken=; path=/";
    router.push("/login");
  }

  function handleProfile() {
    router.push("/profile");
  }

  const toggleNav = () => {
    setIsShown(!isShown);
    if (typeof window !== "undefined" && !isShown) {
      document.body.style.overflow = "hidden";
    } else if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };
  return (
    <>
      <nav
        className={`${
          pathname.startsWith("/admin") ? "hidden" : "flex"
        } flex-row justify-between items-center fixed py-5 w-full z-[31]`}
      >
        {isShown && (
          <AnimatePresence>
            <motion.div
              {...dropdownVariants}
              className={` w-screen h-screen bg-main-bg absolute top-0 flex justify-center items-center z-30 origin-top`}
            >
              <div className={` flex w-[100vw] flex-col items-center`}>
                <div>
                  <HamNavLink
                    target="/"
                    text="Home"
                    active={pathname === "/"}
                    setIsShown={setIsShown}
                  />
                  <HamNavLink
                    target="/teams"
                    text="Teams"
                    active={pathname === "/teams"}
                    setIsShown={setIsShown}
                  />
                  <HamNavLink
                    target="/faq"
                    text="FAQS"
                    active={pathname === "/faq"}
                    setIsShown={setIsShown}
                  />
                  <HamNavLink
                    target="/quizzes"
                    text="Quiz"
                    active={pathname === "/quizzes"}
                    setIsShown={setIsShown}
                  />
                  <HamNavLink
                    target="/profile"
                    text="Profile"
                    active={pathname === "/profile"}
                    setIsShown={setIsShown}
                  />
                  <HamNavLinkLogout
                    text={"Logout"}
                    setIsShown={setIsShown}
                    handleLogout={handleSignout}
                    red={true}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <div id="logo" className="size-16 ml-[5%] z-[31]">
          <Link href={`${pathname === "/login" ? "/login" : "/"}`}>
            <Image
              quality={100}
              src="/logo.svg"
              alt="IEEECS Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <button
          className={`${
            pathname === "/login" ? "hidden" : "visible"
          } md:hidden inline-block hamburger hamburger--spring z-[31]`}
          type="button"
          onClick={() => {
            toggleNav();
          }}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <ul
          className={` ${
            pathname === "/login" || pathname.startsWith("/admin")
              ? "hidden md:hidden"
              : " hidden md:flex"
          } flex-row justify-center items-center font-striger px-4 py-2 bg-main-grey bg-opacity-40 rounded-full`}
        >
          <Navlink target="/" text="Home" active={pathname === "/"} />
          <Navlink
            target="/teams"
            text="Teams"
            active={pathname === "/teams"}
          />
          <Navlink target="/faq" text="FAQS" active={pathname === "/faq"} />
          <Navlink
            target="/quizzes"
            text="Quiz"
            active={pathname === "/quizzes"}
          />
          <Link href="https://discord.gg/vR7Q6rDAQB" target="_blank">
            <li className="text-white text-2xl mx-5">
              <img src="/discordlogo.svg" alt="Discord Logo"></img>
            </li>
          </Link>
        </ul>
        <div
          id="profile"
          className={`hidden ${
            pathname === "/login" ? "md:hidden" : "md:block"
          } size-14   mr-[5%] hover:cursor-pointer`}
          onClick={handleProfile}
        >
          <Image
            src="/profile.png"
            alt="Profile button"
            width={50}
            height={50}
          />
        </div>
      </nav>
    </>
  );
}
