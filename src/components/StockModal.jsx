import React from "react";

const StockModal = ({
  title,
  quantityInput,
  setQuantityInput,
  customerInput,
  setCustomerInput,
  showCustomerField = false,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={quantityInput}
            onChange={(e) => setQuantityInput(e.target.value)}
            placeholder="Enter quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        {showCustomerField && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={customerInput}
              onChange={(e) => setCustomerInput(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
        )}
        <button
          onClick={onSubmit}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ADD
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StockModal;
