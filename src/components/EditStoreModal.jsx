import { useState } from "react";

const EditStoreModal = ({ store, onClose, onUpdate, onDelete }) => {
    const [storeName, setStoreName] = useState(store.name);
  
    const handleUpdate = () => {
      if (!storeName.trim()) {
        alert("Store name is required");
        return;
      }
      onUpdate({ ...store, name: storeName });
    };
  
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this store?")) {
        onDelete(store._id);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">Edit Store</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter store name"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
export default EditStoreModal  