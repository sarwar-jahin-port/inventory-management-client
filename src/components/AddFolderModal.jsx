import { useState } from "react";

const AddFolderModal = ({ stores, onClose, onSave }) => {
    const [formData, setFormData] = useState({ name: "", store: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!formData.name || !formData.store) {
            alert("Please fill all fields");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h3 className="text-xl font-semibold mb-4">Add Folder</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Store</label>
                    <select
                        name="store"
                        value={formData.store}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">Select a Store</option>
                        {stores.map((store) => (
                            <option key={store._id} value={store._id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

export default AddFolderModal