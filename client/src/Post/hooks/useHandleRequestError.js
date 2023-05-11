import {useState} from "react";

const useHandleRequestError = () => {
  const [error, setError] = useState();

  const handleCatchError = (error) => {
    if (error?.response?.status === 401) {
      setError("Unauthorized. Please login");
    } else if (error?.response?.status === 403) {
      setError("Forbidden");
    } else {
      setError("Something went wrong. Please try again later");
    }
  };
  const resetError = () => {
    setError(null);
  };

  return {
    error,
    setError,
    handleCatchError,
    resetError,
  };
};

export default useHandleRequestError;
