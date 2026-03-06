const BarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="w-full space-y-4 p-2">
      {data.map((item, i) => (
        <div key={i} className="group relative">
          <div className="flex justify-between mb-1 text-xs font-medium">
            <span className="text-gray-600">{item.label}</span>
            <span className="text-blue-600 font-bold">${item.value.toLocaleString()}</span>
          </div>
          
          <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-[10px] px-2 py-1 rounded">
            Value: ${item.value}
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out group-hover:bg-blue-400"
              style={{ width: `${(item.value / maxVal) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;