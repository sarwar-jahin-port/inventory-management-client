const DeleteConfirmation = ({ onClose, onConfirm, itemName, itemType }) => {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this?</h3>
          {/* <p className="mb-4">
            You are about to delete <strong>{itemName}</strong>. This action cannot be undone.
          </p> */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Yes, Delete
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
  
  export default DeleteConfirmation;
  