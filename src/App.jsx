import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteConfirmation from "./components/DeleteConfirmation";
import AddProductModal from "./components/AddProductModal";
import AddFolderModal from "./components/AddFolderModal";
import EditFolderModal from "./components/EditFolderModal";
import { CiEdit } from "react-icons/ci";
import AddStoreModal from "./components/AddStoreModal";
import EditStoreModal from "./components/EditStoreModal";
import StockModal from "./components/StockModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import SalesReportTable from "./components/SalesReportTable";

function App() {
  const [stores, setStores] = useState([]);
  const [folders, setFolders] = useState([]);
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [showSales, setShowSales] = useState(false);

  // Function to fetch sales data
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sales`);
      setSalesData(response.data);
      setShowSales(true);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  // states for stores only
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);

  // Functionalities for stores only
  const addStore = async (newStore) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/stores`, newStore);
      setStores((prev) => [...prev, response.data]); // Update the store list
      setIsAddStoreModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding store:", error.message);
    }
  };

  const updateStore = async (updatedStore) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/stores/${updatedStore._id}`,
        { name: updatedStore.name }
      );
      setStores((prev) =>
        prev.map((store) => (store._id === updatedStore._id ? response.data : store))
      );
      setSelectedStore(null); // Close the modal
    } catch (error) {
      console.error("Error updating store:", error.message);
    }
  };

  const deleteStore = async (storeId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/stores/${storeId}`);
      setStores((prev) => prev.filter((store) => store._id !== storeId));
      setSelectedStore(null); // Close the modal
      setSelectedStoreId(null);
      setFolders([])
      setProducts([])
    } catch (error) {
      console.error("Error deleting store:", error.message);
    }
  };


  // states for folders only
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isFolderAddModalOpen, setIsFolderAddModalOpen] = useState(false);

  // Functionalitites for folders only
  const addFolder = async (newFolder) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/folders`, newFolder);
      setFolders((prev) => [...prev, response.data]); // Update folder list
      setIsFolderAddModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error adding folder:", error.message);
    }
  };

  const updateFolder = async (updatedFolder) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/folders/${updatedFolder._id}`, updatedFolder);
      setFolders((prev) =>
        prev.map((folder) => (folder._id === updatedFolder._id ? response.data : folder))
      );
      setSelectedFolder(null); // Close modal
    } catch (error) {
      console.error("Error updating folder:", error.message);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/folders/${folderId}`);
      setFolders((prev) => prev.filter((folder) => folder._id !== folderId));
      setSelectedFolder(null); // Close modal
      setProducts([])
    } catch (error) {
      console.error("Error deleting folder:", error.message);
    }
  };


  // states for products only
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [modalType, setModalType] = useState(null); // 'add' or 'subtract'
  const [quantityInput, setQuantityInput] = useState(""); // For quantity input
  const [customerInput, setCustomerInput] = useState("");

  // Functionalities for products only
  const addProduct = async (newProductFormData) => {
    try {
      // Add the selected folder ID to FormData
      newProductFormData.append("folder", selectedFolderId); // Ensure `selectedFolderId` is defined and valid

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, newProductFormData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper handling of FormData
        },
      });

      // Update product list with the new product
      setProducts((prev) => [...prev, response.data]);

      // Close modal
      setIsAddModalOpen(false);

      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const confirmDelete = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${productId}`);
      setProducts((prev) => prev.filter((product) => product._id !== productId));
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleUpdateStock = async (productId, addedQuantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}/addStock`,
        { addedQuantity }
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId ? response.data : product
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleSale = async (productId, quantitySold, customerName) => {
    try {
      // Send the quantitySold and customerName to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}/subtractStock`,
        { quantitySold, customerName }
      );
      // Update the local product list
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId ? response.data : product
        )
      );
      // Close the modal after successful stock update
      handleFolderClick(selectedFolderId);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error subtracting product stock:", error.message);
    }
  }

  const handleOpenModal = (product, type) => {
    setModalType(type);
    setCurrentProduct(product);
    setQuantityInput(""); // Reset the input field
    setCustomerInput(""); // Reset customer name (if applicable)
  };

  const handleAddStock = () => {
    if (!quantityInput || isNaN(quantityInput)) {
      alert("Please enter a valid quantity.");
      return;
    }
    handleUpdateStock(currentProduct._id, parseInt(quantityInput)); // Call the stock update handler
    closeModal();
  };

  const handleSubtractStock = () => {
    if (!quantityInput || isNaN(quantityInput)) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (!customerInput.trim()) {
      alert("Please enter a customer name.");
      return;
    }
    handleSale(currentProduct._id, parseInt(quantityInput), customerInput); // Call the sale handler
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setCurrentProduct(null);
    setQuantityInput("");
    setCustomerInput("");
  };

  // Fetch all stores on mount
  useEffect(() => {
    const fetchStores = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/stores`);
      setStores(response.data);
    };
    fetchStores();
  }, []);

  // Fetch folders when a store is selected
  const handleStoreClick = async (storeId) => {
    setSelectedStoreId(storeId);
    setSelectedFolderId(null); // Reset folder selection
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/stores/folders/${storeId}`);
    setFolders(response.data);
    setProducts([]); // Clear products
  };

  // Fetch products when a folder is selected
  const handleFolderClick = async (folderId) => {
    setSelectedFolderId(folderId);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/folder/${folderId}`);
    if (response?.data) setProducts(response.data);
  };

  const [selectedSource, setSelectedSource] = useState('source');

  // Extract unique source names from the products data
  const sources = ['source', ...new Set(products.map(product => product.source))];

  const filteredProducts = selectedSource === 'source'
    ? products // Show all products
    : products.filter(product => product.source === selectedSource);

  console.log(products)
  return (
    <div className="">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-gray-900 mt-10 mb-6 sm:mt-12 sm:mb-8">
        INVENTORY MANAGEMENT SYSTEM
      </h1>

      {!showSales && <div className="w-full sm:w-10/12 mx-auto bg-white shadow-lg rounded-xl border border-gray-300 p-6 sm:p-8 md:p-10 my-6">
        {/* Store Buttons */}
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Stores:</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
            onClick={() => setIsAddStoreModalOpen(true)}
          >
            <IoMdAddCircleOutline className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {stores.length>0 && stores?.map((store) => (
            <button
              key={store._id}
              onClick={() => handleStoreClick(store._id)}
              className={`px-6 py-3 rounded-lg text-gray-900 font-medium transition duration-200 ease-in-out transform ${selectedStoreId === store._id
                ? "bg-green-300 shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{store.name}</span>
                {store._id === selectedStoreId && (
                  <CiEdit
                    className="text-xl cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => setSelectedStore(store)}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Folder Grid */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Folders:</h1>
          {selectedStoreId && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={() => setIsFolderAddModalOpen(true)}
            >
              <IoMdAddCircleOutline className="text-2xl" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {folders.length > 0 &&
            folders.map((folder) => (
              <div
                key={folder._id}
                onClick={() => handleFolderClick(folder._id)}
                className={`mt-2 px-6 py-3 rounded-lg text-gray-900 font-medium cursor-pointer transition duration-200 ease-in-out transform ${selectedFolderId === folder._id
                  ? "bg-blue-300 shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
                  } flex justify-between items-center gap-3`}
              >
                <span>{folder.name}</span>
                {folder._id === selectedFolderId && (
                  <CiEdit
                    className="text-xl cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => setSelectedFolder(folder)}
                  />
                )}
              </div>
            ))}
        </div>


        {/* Product List */}
        <div className="mt-6">
          {/* Header for Products Section */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">Products:</h2>
              {selectedFolderId && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <IoMdAddCircleOutline className="text-2xl" />
                </button>
              )}
            </div>
            <button
              onClick={fetchSalesData}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            >
              View Sales Report
            </button>
          </div>

          {/* Add Store Modal */}
          {isAddStoreModalOpen && (
            <AddStoreModal
              onClose={() => setIsAddStoreModalOpen(false)}
              onSave={addStore}
            />
          )}

          {/* Edit Store Modal */}
          {selectedStore && (
            <EditStoreModal
              store={selectedStore}
              onClose={() => setSelectedStore(null)}
              onUpdate={updateStore}
              onDelete={deleteStore}
            />
          )}

          {/* Add Folder Modal */}
          {isFolderAddModalOpen && (
            <AddFolderModal
              stores={stores} // Pass the list of stores fetched from the backend
              onClose={() => setIsFolderAddModalOpen(false)}
              onSave={addFolder}
            />
          )}

          {/* Edit Folder Modal */}
          {selectedFolder && (
            <EditFolderModal
              folder={selectedFolder}
              onClose={() => setSelectedFolder(null)}
              onUpdate={updateFolder}
              onDelete={deleteFolder}
            />
          )}

          {/* Add Product Modal */}
          {isAddModalOpen && (
            <AddProductModal
              onClose={() => setIsAddModalOpen(false)}
              onSave={addProduct}
            />
          )}

          {/* Edit Product Modal */}
          {isEditModalOpen && (
            <EditModal
              product={currentProduct}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleUpdateProduct}
            />
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteConfirmOpen && (
            <DeleteConfirmation
              onClose={() => setIsDeleteConfirmOpen(false)}
              onConfirm={() => confirmDelete(currentProductId)}
            />
          )}
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300 mt-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Stock Update</th>
              <th className="border border-gray-300 px-4 py-2">
                {/* Dropdown for selecting source inside <th> */}
                <select
                  value={selectedSource}
                  onChange={e => setSelectedSource(e.target.value)}
                  className="w-full py-1 px-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {sources.length > 0 && sources.map((source, index) => (
                    <option key={index} value={source}>
                      {source?.charAt(0).toUpperCase() + source?.slice(1)}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100 transition-all duration-300">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover transition-transform duration-300 hover:scale-[5] hover:z-20"
                    />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleOpenModal(product, "add")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleOpenModal(product, "subtract")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.source}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-2 text-gray-500">No products available</td>
              </tr>
            )}
          </tbody>
        </table>

        {modalType && (
          <StockModal
            title={modalType === "add" ? "Add Stock" : "Sell Product"}
            quantityInput={quantityInput}
            setQuantityInput={setQuantityInput}
            customerInput={customerInput}
            setCustomerInput={setCustomerInput}
            showCustomerField={modalType === "subtract"}
            onSubmit={modalType === "add" ? handleAddStock : handleSubtractStock}
            onClose={closeModal}
          />
        )}
      </div>}
      {showSales && <div className="w-full sm:w-10/12 mx-auto bg-white shadow-lg rounded-xl border border-gray-300 p-6 sm:p-8 md:p-10 my-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4" onClick={()=>setShowSales(false)}>Home</button>  
        <SalesReportTable salesData={salesData}/>
      </div>}
    </div>
  );
}

export default App;
