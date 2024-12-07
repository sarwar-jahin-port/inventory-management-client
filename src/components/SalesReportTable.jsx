// SalesReportTable.js
import React from 'react';

const SalesReportTable = ({ salesData }) => {
    console.log(salesData)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.length > 0 ? (
            salesData.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{sale?.customer}</td>
                <td className="border border-gray-300 px-4 py-2">{sale?.product?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{sale?.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(sale?.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">
                No sales data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReportTable;
