import { useEffect, useState } from 'react';
import './LabeledInput.css';

const LabeledInput = ({ label, id, type, value, onChange, autoComplete }) => {
  const [activeClass, setActiveClass] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveClass(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const containerClassName = `labeled-input ${activeClass ? 'active' : ''}`;

  return (
    <div className={containerClassName}>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete ? 'on' : 'off'}
      />
    </div>
  );
};

export default LabeledInput;