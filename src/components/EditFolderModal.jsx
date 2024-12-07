import { useState } from "react";

const EditFolderModal = ({ folder, onClose, onUpdate, onDelete }) => {
    const [folderName, setFolderName] = useState(folder.name);
  
    const handleUpdate = () => {
      onUpdate({ ...folder, name: folderName });
    };
  
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this folder?")) {
        onDelete(folder._id);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">Edit Folder</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Folder Name</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
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
export default EditFolderModal  