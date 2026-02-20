const date = new Date();

export const formattedDate = date.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formattedTime = date.toLocaleTimeString("en-GB", {
  hour: "numeric",
  minute: "numeric",
});