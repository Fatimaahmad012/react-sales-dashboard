const LineChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value), 1); 

  return (
    <div className="w-full h-64 flex items-end justify-between px-4 pb-2 gap-4">
      {data.map((point, i) => {
        const pct = Math.round((point.value / maxVal) * 100);
        const inside = pct >= 18; // threshold to render value inside bar
        const fmt = (v) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(v);
        const shortK = (v) => {
          if (!v) return '$0';
          if (Math.abs(v) >= 1000) return `$${Math.round(v / 1000)}k`;
          return fmt(v);
        };

        return (
          <div key={i} className="group relative flex-1 flex flex-col items-center h-full justify-end">
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl z-10 whitespace-nowrap mb-2">
              {fmt(point.value)}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>

            <div 
              className="w-full bg-blue-500 rounded-t-md transition-all duration-700 ease-out hover:bg-blue-600 cursor-pointer relative shadow-sm overflow-visible"
              style={{ 
                  height: `${(point.value / maxVal) * 100}%`,
                  minHeight: '4px' 
              }}
            >
              {inside ? (
                <span className="absolute top-2 left-3 text-sm font-bold text-white truncate">
                  {point.value > 0 ? shortK(point.value) : ''}
                </span>
              ) : (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-700">
                  {point.value > 0 ? shortK(point.value) : ''}
                </span>
              )}
            </div>

            <div className="border-t border-gray-200 w-full mt-2 pt-2 text-center">
              <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                {point.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineChart;