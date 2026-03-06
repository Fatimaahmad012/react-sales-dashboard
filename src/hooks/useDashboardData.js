import { useQuery } from '@tanstack/react-query';
import { getProducts, getCarts, getUsers } from '../api';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const [products, carts, users] = await Promise.all([
        getProducts(),
        getCarts(),
        getUsers(),
      ]);
      const totalRevenue = carts.reduce((acc, cart) => acc + cart.total, 0);
      const totalOrders = carts.length;
      const activeCustomers = new Set(carts.map(cart => cart.userId)).size;

      return { products, carts, users, totalRevenue, totalOrders, activeCustomers };
    },
  });
};