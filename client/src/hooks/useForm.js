import { useState } from "react";

export const useForm = ({
  handleSubmit,
  requiredFields,
  validateForm,
  initialState,
}) => {
  const [formData, setFormData] = useState(initialState || {});
  const [error, setError] = useState(null);
  // TODO: add loading state

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm) {
      const validation = validateForm(formData);
      if (typeof validation === "string") {
        setError(validation);
        return;
      }
    }
    try {
      if (isFormDisabled) {
        console.error("Invalid form data", formData);
        return;
      }
      setError(null);
      handleSubmit(formData);
    } catch (err) {
      console.error(err);
      const errMsg = null; // TODO: get message from response
      setError(errMsg || "Something went wrong");
    }
  };

  return {
    formData,
    handleInputChange,
    onSubmit,
    isFormDisabled,
    hasError: !!error,
    errorMessage: error,
  };
};
