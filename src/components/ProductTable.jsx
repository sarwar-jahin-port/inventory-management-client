import { useState } from "react";

const ProductTable = ({ products }) => {
  const [quantity, setQuantity] = useState(0);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [customerName, setCustomerName] = useState("");

  const handleStockClick = (product, type) => {
    setCurrentProduct(product);
    setQuantity(type === "add" ? product.quantity + 1 : product.quantity - 1);
    setShowStockModal(true);
  };

  const handleStockUpdate = () => {
    setShowStockModal(false);
    setShowCustomerModal(true);
  };

  const handleCustomerSubmit = () => {
    // Logic to save data to the backend
    console.log("Updated Quantity:", quantity, "Customer:", customerName);
    setShowCustomerModal(false);
    setCustomerName("");
  };

  return (
    <div className="p-2">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Stock Update</th>
            <th className="border border-gray-300 px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 flex items-center gap-2">
                <img
                  src={`http://localhost:5000/uploads/${product.image.replace(
                    "uploads\\",
                    ""
                  )}`}
                  alt={product.name}
                  className="w-8 h-8 rounded-full object-cover hover:scale-[5] transition-all"
                />
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {product.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center flex gap-2 justify-center">
                <button
                  onClick={() => handleStockClick(product, "add")}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleStockClick(product, "subtract")}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  -
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
