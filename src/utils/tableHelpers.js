export const prepareTableData = (users, carts) => {
  return users.map((user) => {
    const userCarts = carts.filter((cart) => cart.userId === user.id);
    
    const totalOrders = userCarts.length;
    const totalRevenue = userCarts.reduce((sum, cart) => sum + cart.total, 0);

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      orders: totalOrders,
      revenue: totalRevenue,
    };
  });
};