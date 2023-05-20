import { useState } from "react";

export const useForm = (onSubmit, requiredFields, initialState) => {
  const [formData, setFormData] = useState(initialState || {});
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormDisabled = (function () {
    let isDisabled = false;
    requiredFields.forEach((key) => {
      if (!formData?.[key]?.length) isDisabled = true;
    });
    return isDisabled;
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isFormDisabled) {
        console.error("Attempted to submit invalid form data", formData);
        return;
      }
      onSubmit(formData);
    } catch (err) {
      console.error(err);
      const errMsg = null; // TODO: get message from response
      setError(errMsg || "Something went wrong");
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isFormDisabled,
    hasError: !!error,
    error,
  };
};
