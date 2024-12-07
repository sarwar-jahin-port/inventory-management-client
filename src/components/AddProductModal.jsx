import { useState } from "react";

const AddProductModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: "", quantity: "", source: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for the preview URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Generate a preview URL using FileReader
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result); // Set the preview URL
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.quantity || !formData.source) {
      alert("Please fill all required fields");
      return;
    }

    // Create FormData to send file and other fields
    const data = new FormData();
    data.append("name", formData.name);
    data.append("quantity", formData.quantity);
    data.append("source", formData.source);
    if (imageFile) {
      data.append("image", imageFile); // Attach the file
    }

    onSave(data); // Pass the FormData to the parent component
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-xl font-semibold mb-4">Add Product</h3>
        
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        {/* Quantity Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        {/* Source Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        {/* File Upload Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
          />
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-96 max-h-80 rounded border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
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

export default AddProductModal;
