"use client";

import Button from "@/components/button";
import { firebaseConfig } from "@/firebase.config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { Bounce, toast } from "react-toastify";
import isMobile from "is-mobile";

function validateEmail(email: string | null) {
  //email must end with vitstudent.ac.in
  if (typeof email === "undefined" || email === null) return false;
  if (email.endsWith("@vitstudent.ac.in")) {
    return true;
  } else {
    return false;
  }
}

export default function Login() {
  function removeLoader() {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router) return;
  }, [router]);

  function verifyEmailinDB(user: User) {
    axios
      .post("https://recruitments-portal-backend.vercel.app/admin/check-user", {
        email: user.email,
      })
      .then((response) => {
        if (response.status === 200) {
          document.cookie = `email=${user.email}; path=/`;
          document.cookie = `adminaccessToken=${response.data.token}; path=/`;
          removeLoader();
          router.push("/admin/dashboard");
          return; // Add this line to exit the function
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios
      .post("http://localhost:4030/seniorcore/check-user", {
        email: user.email,
      })
      .then((response) => {
        if (response.status === 200) {
          document.cookie = `email=${user.email}; path=/`;
          document.cookie = `scaccessToken=${response.data.token}; path=/`;
          removeLoader();
          router.push("/admin/seniorCore/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios
      .post("https://recruitments-portal-backend.vercel.app/check_user", {
        email: user.email,
      })
      .then((response) => {
        if (response.status === 200) {
          document.cookie = `email=${user.email}; path=/`;
          document.cookie = `accessToken=${response.data.accessToken}; path=/`;
          document.cookie = `photoURL=${user.photoURL}; path=/`;
          removeLoader();
          router.push("/");
        } else {
          toast.error("Email not registered for IEEE-CS", {
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
          removeLoader();
        }
      })
      .catch((error) => {
        toast.error(error.message, {
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
        removeLoader();
      });
  }
  function handleLogin() {
    setLoading(true);
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "vitstudent.ac.in",
      prompt: "select_account",
    });
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (!validateEmail(user.email)) {
          toast.error("Please login with your VIT email", {
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

          signOut(auth);
        }

        verifyEmailinDB(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        removeLoader();
        if (!isMobile) {
          toast.error(errorMessage, {
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
      });
  }
  return (
    <div className="w-screen  h-screen md:h-screen flex flex-col items-center justify-center">
      <div className="w-[80vw] md:w-screen flex flex-col items-center justify-between">
        <img
          src={"/login-splash.svg"}
          alt="Login splash"
          width={800}
          height={800}
          loading="lazy"
          style={{
            marginBottom: "10vh",
          }}
        />
        <Button text="Sign in with Google" onClick={handleLogin} />
      </div>
      <Loader visibility={loading} />
    </div>
  );
}
