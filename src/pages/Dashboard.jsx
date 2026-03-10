import React, { useState, useMemo } from 'react';
import { useDashboardData } from '../api/hooks/useDashboardData';
import StatCard from '../components/cards/StatCard';
import DashboardChart from '../components/charts/DashboardChart';
import { prepareChartData } from '../utils/LineChartHelpers';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { prepareCategoryData } from '../utils/barCharHelper';
import SalesTable from '../components/table/SalesTables';
import { prepareTableData } from '../utils/tableHelpers';
import DateInput from '../components/DateInput';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  });

  const { data, isLoading, isError, isFetching } = useDashboardData();
  const filteredData = useMemo(() => {
    if (!data) return { carts: [], products: [], users: [], totalRevenue: 0, totalOrders: 0, activeCustomers: 0 };

    const allProducts = data.products || [];
    const allCarts = data.carts || [];
    const allUsers = data.users || [];

    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    const filteredProducts = allProducts.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const productDate = product.meta && product.meta.createdAt ? new Date(product.meta.createdAt) : null;
      const matchesStart = !startDate || (productDate && productDate >= startDate);
      const matchesEnd = !endDate || (productDate && productDate <= endDate);
      return matchesCategory && matchesStart && matchesEnd;
    });

    const productIds = new Set(filteredProducts.map(p => p.id));
    const filteredCarts = allCarts.filter(cart => 
      cart.products && cart.products.some(cartItem => productIds.has(cartItem.id))
    );

    const totalRevenue = filteredCarts.reduce((acc, cart) => acc + (cart.total || 0), 0);
    const totalOrders = filteredCarts.length;
    const activeCustomers = new Set(filteredCarts.map(cart => cart.userId)).size;

    return {
      products: filteredProducts,
      carts: filteredCarts,
      users: allUsers,
      totalRevenue,
      totalOrders,
      activeCustomers,
    };
  }, [data, filters]);

  if (isError) return <div className="p-10 text-red-500">Error loading dashboard data.</div>;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="h-10 bg-white rounded w-full md:w-1/3 shadow-sm"></div>
              <div className="flex gap-3 w-full md:w-2/3">
                <div className="h-10 bg-white rounded flex-1"></div>
                <div className="h-10 bg-white rounded w-48"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="h-20 bg-white rounded shadow animate-pulse"></div>
              <div className="h-20 bg-white rounded shadow animate-pulse"></div>
              <div className="h-20 bg-white rounded shadow animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-white rounded shadow animate-pulse"></div>
              <div className="h-64 bg-white rounded shadow animate-pulse"></div>
            </div>

            <div className="bg-white p-6 rounded shadow mt-10">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const safeData = filteredData;
  const revenueChartData = prepareChartData(safeData.carts);
  const categoryChartData = prepareCategoryData(safeData.products);

  const tableData = prepareTableData(safeData.users, safeData.carts).filter(rep => rep.orders > 0);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Sales Performance Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3 rounded shadow-sm border border-gray-200">
          <div className="flex items-center w-full sm:w-auto gap-2">
            <select 
              aria-label="Category filter"
              className="flex-1 min-w-0 border border-gray-300 bg-white px-3 py-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
            <option value="">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="laptops">Laptops</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="mens-watches">Men Watches</option>
            <option value="mens-shoes">Men Shoes</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <DateInput
              ariaLabel="Start date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <span className="text-gray-400">to</span>
            <DateInput
              ariaLabel="End date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`$${safeData.totalRevenue.toLocaleString()}`} />
        <StatCard title="Total Orders" value={safeData.totalOrders} />
        <StatCard title="Active Customers" value={safeData.activeCustomers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart title="Monthly Revenue Performance">
          <LineChart data={revenueChartData} />
        </DashboardChart>
        <DashboardChart title="Top Sales by Category">
          <BarChart data={categoryChartData} />
        </DashboardChart>
      </div>


      <div className="bg-white p-6 rounded shadow mt-10">
        <h2 className="text-xl font-bold mb-4">Active Sales Representatives</h2>
        {tableData.length > 0 ? (
          <SalesTable data={tableData} />
        ) : (
          <p className="text-gray-500 italic">No active sales found for this filter selection.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;