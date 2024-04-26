import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

interface ResponseRound2 {
  _id: string;
  email: string;
  domain: string;
  easy: {
    question: string;
    links: {
      link1: string;
      link2: string[];
    };
  }[];
  medium: {
    question: string;
    links: {
      link1: string;
      link2: string[];
    };
  }[];
  hard: {
    question: string;
    links: {
      link1: string;
      link2: string[];
    };
  }[];
}

interface ResponseDetailsProps {
  email: string;
  onClose: () => void;
  domain: string;
}

const ResponseDetails: React.FC<ResponseDetailsProps> = ({
  email,
  onClose,
  domain,
}) => {
  const [responseDetails, setResponseDetails] = useState<ResponseRound2[]>([]);

  const handleApprove = async () => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      if (!accessToken) {
        toast.error("Access Token not found in cookies", {
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
        return;
      }

      const requestBody = {
        result: 1,
        email: email,
        round: 2,
        domain: domain,
      };

      await axios.post(
        `${process.env.BACKEND_URL}/eval/set_report`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Response approved successfully", {
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
      onClose();
    } catch (error) {
      toast.error("Error approving response", {
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

  const handleReject = async () => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("adminaccessToken"))
        ?.split("=")[1];

      if (!accessToken) {
        toast.error("Access Token not found in cookies", {
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
        return;
      }

      const requestBody = {
        result: 2,
        email: email,
        round: 2,
        domain: domain,
      };

      await axios.post(
        `${process.env.BACKEND_URL}/eval/set_report`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.error("Response rejected successfully", {
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
      onClose();
    } catch (error) {
      toast.error("Error rejecting response", {
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

  useEffect(() => {
    const fetchResponseDetails = async () => {
      try {
        const emailValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("email"))
          ?.split("=")[1];

        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("adminaccessToken"))
          ?.split("=")[1];

        if (!emailValue || !accessToken) {
          toast.error("Email or Access Token not found in cookies", {
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
          return;
        }

        const response = await axios.get<ResponseRound2[]>(
          `${process.env.BACKEND_URL}/response/round2/${email}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: {
              email: emailValue,
            },
          }
        );

        setResponseDetails(response.data);
      } catch (error) {
        toast.error("Error fetching response details", {
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

    fetchResponseDetails();
  }, [email]);

  return (
    <div className="fixed w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div
        className="bg-white p-4 rounded-md overflow-y-auto w-full"
        style={{ height: "66vh", width: "66vw" }}
      >
        <h2 className="text-xl font-bold mb-4">
          Response Details
          <button
            className=" text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close
          </button>
        </h2>

        <div>
          {responseDetails
            .filter((response) => response.domain === domain)
            .map((response) => (
              <div key={response._id} className="mb-4">
                <p>Email: {response.email}</p>
                <p>Domain: {response.domain}</p>
                <h3>Easy Questions:</h3>
                <ul>
                  {response.easy.map((question, index) => (
                    <li key={index}>
                      <strong>{question.question}</strong>
                      <p>Link 1: {question.links.link1}</p>
                      <p>Link 2: {question.links.link2.join(", ")}</p>
                    </li>
                  ))}
                </ul>
                <h3>Medium Questions:</h3>
                <ul>{response.medium.map((question, index) => (
                  <li key={index}>
                    <strong>{question.question}</strong>
                    <p>Link 1: {question.links.link1}</p>
                    <p>Link 2: {question.links.link2.join(", ")}</p>
                  </li>
                ))}
                </ul>
                <h3>Hard Questions:</h3>
                <ul>
                  {response.hard.map((question, index) => (
                    <li key={index}>
                      <strong>{question.question}</strong>
                      <p>Link 1: {question.links.link1}</p>
                      <p>Link 2: {question.links.link2.join(", ")}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleApprove}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseDetails;