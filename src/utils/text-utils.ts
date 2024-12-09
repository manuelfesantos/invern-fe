export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const passwordErrorMessage = `Password must be at least 8 characters long,
contain at least one uppercase letter,
one lowercase letter
and one number.`;
