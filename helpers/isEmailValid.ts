/**
 * Checks if an email is valid.
 * @param email - The string with the email information.
 * @returns A boolean value indicating if the email is valid.
 */
export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
