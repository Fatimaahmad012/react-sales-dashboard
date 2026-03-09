import { useQuery } from '@tanstack/react-query';
import { getProducts, getCarts, getUsers } from '../services';

export const useDashboardData = (filters) => {
  return useQuery({
    queryKey: ['dashboardData', filters], 
    queryFn: async () => {
      const [allProducts, allCarts, allUsers] = await Promise.all([
        getProducts(),
        getCarts(),
        getUsers(),
      ]);
      const filteredProducts = allProducts.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const productDate = new Date(product.meta.createdAt); 
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;
      const matchesStart = !startDate || productDate >= startDate;
      const matchesEnd = !endDate || productDate <= endDate;

      return matchesCategory && matchesStart && matchesEnd;
      });
      const productIds = new Set(filteredProducts.map(p => p.id));
      const filteredCarts = allCarts.filter(cart => 
        cart.products.some(cartItem => productIds.has(cartItem.id))
      );
      const totalRevenue = filteredCarts.reduce((acc, cart) => acc + cart.total, 0);
      const totalOrders = filteredCarts.length;
      const activeCustomers = new Set(filteredCarts.map(cart => cart.userId)).size;

      return { 
        products: filteredProducts, 
        carts: filteredCarts, 
        users: allUsers, 
        totalRevenue, 
        totalOrders, 
        activeCustomers 
      };
    },
  });
};