"use client";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const PutDomains = async (
  selectedDomains: string[],
  domain: string,
  emailValue: string,
  accessToken: string
) => {
  try {
    const response = await axios.put(
      `${
        process.env.BACKEND_URL
      }/put_domains/${domain.toLocaleLowerCase()}/${emailValue}`,
      {
        [domain.toLocaleLowerCase()]: selectedDomains,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      const data = localStorage.getItem("domains");
      const domaintoupdate = domain.toLocaleLowerCase();
      if (data) {
        const domains = JSON.parse(data);
        const domainToUpdate = selectedDomains.map((subdomain) => ({
          subdomain,
          completed: false,
        }));
        domains[domaintoupdate] = domainToUpdate;
        localStorage.setItem("domains", JSON.stringify(domains));
      }
      toast.success("Successfully submitted", {
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
    } else {
      toast.error("Failed to submit", {
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
  } catch (error: Error | any) {
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
  }
};

export const GetDomains = async (emailValue: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/get_domains/${emailValue}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error: Error | any) {
    throw error;
  }
};

export const GetTasks = async (domain: string) => {
  const emailValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("email"))
    ?.split("=")[1];
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];
  try {
    const response = await axios.get(
      `https://recruitments-portal-backend.vercel.app/round2/tasks/${domain}/${emailValue}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      // const data = response.data[0].questions
      return response.data[0].questions;
    } else {
      alert(`${response.data.message}, Login Again and Try Again`);
      throw new Error(`Request failed , ${response.data.message}`);
    }
  } catch (error: Error | any) {
    alert(`Login Again and Try`);
    throw error;
  }
};

export interface answerFormat {
  domain: string;
  question: string;
  difficulty: string;
  link1: string;
  link2: string;
}

export const SubmitTask = async ({
  domain,
  question,
  difficulty,
  link1,
  link2,
}: answerFormat) => {
  const emailValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("email"))
    ?.split("=")[1];
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];
  try {
    const response = await axios.put(
      `https://recruitments-portal-backend.vercel.app/round2/submit`,
      {
        email: emailValue,
        domain: domain,
        question: question,
        difficulty: difficulty,
        link1: link1,
        link2: link2,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      // const data = response.data[0].questions
      return response;
    } else {
      alert(`${response.data.message}, Login Again and Try Again`);
      throw new Error(`Request failed , ${response.data.message}`);
    }
  } catch (error: Error | any) {
    alert(`Login Again and Try Again`);
    throw error;
  }
};
