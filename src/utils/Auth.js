import { getItem } from "./localStorage";

export const isAuthenticatedFromStorage = () => {
  return getItem("auth") || {};
};
