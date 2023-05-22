import { useState } from "react";

export const useForm = ({
  handleSubmit,
  requiredFields,
  validateForm,
  initialState,
}) => {
  const [formData, setFormData] = useState(initialState || {});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateForm) {
      const validation = validateForm(formData);
      if (typeof validation === "string") {
        setError(validation);
        setIsLoading(false);
        return;
      }
    }
    try {
      if (isFormDisabled) {
        console.error("Invalid form data", formData);
        return;
      }
      setError(null);
      await handleSubmit(formData);
    } catch (err) {
      console.error(err);
      // TODO: add Sentry logging
      setError("Uncaught error");
    }
    setIsLoading(false);
  };

  return {
    formData,
    onSubmit,
    isLoading,
    isFormDisabled,
    handleInputChange,
    hasError: !!error,
    errorMessage: error,
  };
};
