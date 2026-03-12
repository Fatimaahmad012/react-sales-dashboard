import { useQuery } from '@tanstack/react-query';
import { getProducts, getCarts, getUsers } from '../services';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const [allProducts, allCarts, allUsers] = await Promise.all([
        getProducts(),
        getCarts(),
        getUsers(),
      ]);

      return {
        products: allProducts,
        carts: allCarts,
        users: allUsers,
      };
    },
    // keep data cached and avoid refetching automatically so filters can be applied client-side
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};