// Validation of email
export const validateString = (value, maxLength) => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  // We only allow the email sent as string
  return true;
};

// Error handling of email
export const getErrorMessage = (error) => {
  let message;

  // Dealing with different type of error
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
