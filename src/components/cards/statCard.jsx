const StatCard = ({ title, value, subtext }) => (
  <div className="bg-white p-6 rounded shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
    {subtext && <p className="text-xs text-green-500 mt-1">{subtext}</p>}
  </div>
);

export default StatCard;