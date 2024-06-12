import { Bounce, toast } from "react-toastify";
import axios from "axios";
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
        round: 3,
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
        round: 3,
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

  return (
    <div className="fixed w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div
        className="bg-white p-4 rounded-md overflow-y-auto w-full"
        style={{ height: "25vh", width: "20vw" }}
      >
        <h2 className="text-xl font-bold mb-4">
          Response Details
          <button
            className=" text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close
          </button>
        </h2>

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
    </div>
  );
};

export default ResponseDetails;