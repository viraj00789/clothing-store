export const flyToCart = (event, product, idFromCart = "cart-icon") => {
  if (!product) return;

  const cart = document.getElementById(`${idFromCart}`);
  if (!cart) return;

  const cartRect = cart.getBoundingClientRect();
  const buttonRect = event.currentTarget.getBoundingClientRect();

  // start at center of button
  const startX = buttonRect.left + buttonRect.width / 2 - 150;
  const startY = buttonRect.top + buttonRect.height / 2 + 30;

  // end at center of cart
  const endX = cartRect.left + cartRect.width / 2 - 60;
  const endY = cartRect.top + cartRect.height / 2 - 60;

  // create flying image
  const img = document.createElement("img");
  img.src = product.allImages[0];
  img.className = "fly-item";
  img.style.width = "200px";
  img.style.height = "200px";
  img.style.borderRadius = "20px";
  img.style.left = startX + "px";
  img.style.top = startY + "px";
  img.style.objectFit = "cover";
  // img.style.opacity = "0.77";
  document.body.appendChild(img);

  // force reflow so initial position registers
  img.getBoundingClientRect();

  // subtle J-curve: smaller downward drop
  const midX = startX + (endX - startX) / 4; // x moves slightly right
  const midY = startY + 50; // much less downward

  setTimeout(() => {
    img.style.transition = "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)";
    img.style.transform = `translate(${midX - startX}px, ${midY - startY}px) scale(0.6)`;
  }, 10);

  setTimeout(() => {
    img.style.transition =
      "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease";
    img.style.transform = `translate(${endX - startX - 40}px, ${endY - startY - 40}px) scale(0.2)`;
    img.style.opacity = "0.5";
  }, 620);

  setTimeout(() => img.remove(), 1250);
};
