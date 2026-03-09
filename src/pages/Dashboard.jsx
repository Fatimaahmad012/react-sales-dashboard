import React, { useState } from 'react';
import { useDashboardData } from '../api/hooks/useDashboardData';
import StatCard from '../components/cards/StatCard';
import DashboardChart from '../components/charts/DashboardChart';
import { prepareChartData } from '../utils/LineChartHelpers';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import { prepareCategoryData } from '../utils/barCharHelper';
import SalesTable from '../components/table/SalesTables';
import { prepareTableData } from '../utils/tableHelpers';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  });

  const { data, isLoading, isError } = useDashboardData(filters);

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError) return <div className="p-10 text-red-500">Error loading dashboard data.</div>;


  const revenueChartData = prepareChartData(data.carts);
  const categoryChartData = prepareCategoryData(data.products);
  

  const tableData = prepareTableData(data.users, data.carts).filter(rep => rep.orders > 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Sales Performance Dashboard</h1>
        
        <div className="flex gap-3 bg-white p-3 rounded shadow-sm border border-gray-200">
          <select 
            className="border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
          
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              className="border p-2 rounded text-sm"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <span className="text-gray-400">to</span>
            <input 
              type="date" 
              className="border p-2 rounded text-sm"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`$${data.totalRevenue.toLocaleString()}`} />
        <StatCard title="Total Orders" value={data.totalOrders} />
        <StatCard title="Active Customers" value={data.activeCustomers} />
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