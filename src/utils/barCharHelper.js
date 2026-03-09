export const prepareCategoryData = (products) => {
  const categoryMap = {};
  products.forEach(product => {
    const cat = product.category;
    categoryMap[cat] = (categoryMap[cat] || 0) + product.price;
  });
  return Object.keys(categoryMap)
    .map(key => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: categoryMap[key]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};