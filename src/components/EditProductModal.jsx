import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation"; // Assuming it's in the same folder

const EditProductModal = ({ product, onClose, onUpdate, onDelete }) => {
  const [productName, setProductName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [source, setSource] = useState(product.source);
  const [folder, setFolder] = useState(product.folder);
  const [imageFile, setImageFile] = useState(null); // For the new image file preview
  const [previewImage, setPreviewImage] = useState(product.image); // For image preview
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show DeleteConfirmation modal

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Display the selected image
    }
  };

  const handleUpdate = () => {
    const updatedProduct = {
      _id: product._id,
      name: productName,
      quantity,
      source,
      folder,
    };

    // Pass the updated product and image file to the parent onUpdate handler
    onUpdate(updatedProduct, imageFile);
  };

  const handleDelete = () => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Call the parent's delete function and pass the product ID
    onDelete(product._id);
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const handleCloseDeleteModal = () => {
    // Close the delete confirmation modal without deleting
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Folder</label>
            <input
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            {previewImage && <img src={previewImage} alt="Preview" className="mb-2 w-full h-auto rounded-lg" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <div className="flex space-x-3">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
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
      </div>

      {/* Show DeleteConfirmation modal if showDeleteModal is true */}
      {showDeleteModal && (
        <DeleteConfirmation
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          itemName={productName} // Pass the item name (e.g., product name) to the confirmation modal
          itemType="Product"
        />
      )}
    </div>
  );
};

export default EditProductModal;
