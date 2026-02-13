export const generateOrderNumber = () => {
  const part1 = Math.floor(100 + Math.random() * 900); // 3 digits
  const part2 = Math.floor(1000 + Math.random() * 9000); // 4 digits
  const part3 = Math.floor(1000 + Math.random() * 9000); // 4 digits

  return `#${part1}-${part2}-${part3}`;
};
