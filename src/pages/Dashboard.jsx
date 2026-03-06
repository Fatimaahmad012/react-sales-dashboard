import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import StatCard from '../components/cards/statCard';
import DashboardChart from '../components/charts/DashboardChart';

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError) return <div className="p-10 text-red-500">Error!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Sales Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Revenue" value="$ --" />
        <StatCard title="Total Orders" value={data.carts.length} />
        <StatCard title="Active Customers" value={data.users.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <DashboardChart title="Revenue Trends">
          <span className="text-gray-400">Line Chart Placeholder</span>
        </DashboardChart>
        
        <DashboardChart title="Order Distribution">
          <span className="text-gray-400">Bar Chart Placeholder</span>
        </DashboardChart>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sales Representatives</h2>
        <p className="text-gray-400">Data table placeholder...</p>
      </div>
    </div>
  );
};

export default Dashboard;