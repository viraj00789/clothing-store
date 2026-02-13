import toast from "react-hot-toast";

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    toast.error("Error saving to localStorage", err);
  }
};

export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    toast.error("Error reading from localStorage", err);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    toast.error("Error removing from localStorage", err);
  }
};
