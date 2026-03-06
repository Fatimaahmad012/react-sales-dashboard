const DashboardChart = ({ title, children }) => (
  <div className="bg-white p-6 rounded shadow">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">{title}</h3>
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
      {children}
    </div>
  </div>
);

export default DashboardChart;