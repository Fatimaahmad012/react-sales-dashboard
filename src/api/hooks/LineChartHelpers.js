export const prepareChartData = (carts) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenueMap = {};
  carts.forEach((cart, index) => {
    const month = months[index % months.length]; 
    revenueMap[month] = (revenueMap[month] || 0) + cart.total;
  });

  return months.map(m => ({
    label: m,
    value: revenueMap[m] || 0
  }));
};
