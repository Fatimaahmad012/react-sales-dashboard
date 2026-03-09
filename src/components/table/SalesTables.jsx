const SalesTable = ({ data }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-4 md:px-6 py-3 border-b">Representative</th>
            {/* Hide Email on small screens */}
            <th className="px-6 py-3 border-b hidden md:table-cell">Email</th>
            <th className="px-4 md:px-6 py-3 border-b text-center">Orders</th>
            <th className="px-4 md:px-6 py-3 border-b text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                <div className="flex flex-col">
                  <span>{row.name}</span>
                  {/* Show email under name only on mobile */}
                  <span className="text-[10px] text-gray-400 font-normal md:hidden">
                    {row.email}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 hidden md:table-cell">
                {row.email}
              </td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center text-gray-700 text-sm md:text-base">
                {row.orders}
              </td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right font-semibold text-green-600 text-sm md:text-base">
                ${row.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;