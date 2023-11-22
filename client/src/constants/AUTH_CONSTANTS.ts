export const REGISTER_CONSTANTS = {
  email: "",
  password: "",
  name: "",
};
export const VALIDATION_CONSTANTS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
  name: /^[^0-9!@#$%^&*]{4,}$/,
};
export const LOGIN_CONSTANTS = {
  email: "",
  password: "",
};
export const SOCIALS = [
  "github",
  "linkedIn",
  "youtube",
  "instagram",
  "twitter",
];
