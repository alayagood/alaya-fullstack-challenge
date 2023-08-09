export const validateForm = (email, password, confirmPassword) => {
  const errors = [];

  if (!email.trim() || !password.trim()) {
    errors.push('All fields are required');
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/(?=.*[@#$%^&+=])/.test(password)) {
    errors.push('Password must contain at least one special character (@#$%^&+=)');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email address');
  }

  if (confirmPassword && password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};