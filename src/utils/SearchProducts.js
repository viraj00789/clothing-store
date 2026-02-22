export const searchProducts = (products, query) => {
  if (!query) return products;

  const search = query.toLowerCase().trim();

  return products
    .map((product) => {
      let score = 0;

      if (product.title.toLowerCase().includes(search)) score += 5;
      if (product.brand.toLowerCase().includes(search)) score += 3;
      if (product.color?.toLowerCase().includes(search)) score += 2;

      if (
        product.categories?.some((cat) =>
          cat.toLowerCase().includes(search)
        )
      )
        score += 2;

      return { ...product, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);
};