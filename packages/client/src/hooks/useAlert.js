import { useState } from "react";

function useAlert() {
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [errorAlertMessage, setErrorAlertMessage] = useState("");

  return {
    successAlertMessage,
    setSuccessAlertMessage,
    errorAlertMessage,
    setErrorAlertMessage
  };
}

export default useAlert;
