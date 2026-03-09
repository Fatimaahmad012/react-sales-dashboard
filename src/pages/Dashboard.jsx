import React from 'react';
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
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (isError) return <div className="p-10 text-red-500">Error!</div>;
    const revenueChartData = prepareChartData(data.carts);
    const categoryChartData = prepareCategoryData(data.products);
    const tableData = prepareTableData(data.users, data.carts);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Sales Performance Dashboard</h1>
      
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
            title="Total Revenue" 
            value={`$${data.totalRevenue.toLocaleString()}`} 
        />
        <StatCard 
            title="Total Orders" 
            value={data.totalOrders} 
        />
        <StatCard 
            title="Active Customers" 
            value={data.activeCustomers} 
        />
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
    <h2 className="text-xl font-bold mb-4">Sales Representatives</h2>
    <SalesTable data={tableData} />
  </div>
  </div>
  );
};

export default Dashboard;



