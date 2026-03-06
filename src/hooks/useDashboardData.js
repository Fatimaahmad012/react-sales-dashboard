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
      return { products, carts, users };
    },
  });
};