import { useEffect, useState } from "react";
import axios from "axios";

const ManageItems = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Track editing item
  const [formData, setFormData] = useState({ name: "", price: "", status: "", stock_qty: "" });

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard_categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch items based on selected category
  const fetchItems = async () => {
    if (!selectedCategory) return;

    try {
      const res = await axios.get("http://localhost:5000/api/items", {
        params: { category: selectedCategory },
      });
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  // Handle Edit button click
  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({ name: item.item_name, price: item.price, status: item.status, stock_qty: item.stock_qty });
  };

  // Handle Update functionality
 const handleUpdateItem = async () => {
    try {
        const res = await axios.put(`http://localhost:5000/api/items/${editingItem.item_num}`, formData);

        if (res.data.status === "success") {
            alert("Item updated successfully!");
            setEditingItem(null);
            fetchItems(); // Refresh the updated list
        } else {
            alert("Failed to update item. Please try again.");
        }
    } catch (error) {
        console.error("Error updating item:", error);
        alert("An error occurred while updating the item.");
    }
};

  // Handle Delete functionality
const handleDeleteItem = async (itemNum) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/items/${itemNum}`);

        if (res.data.status === "success") {
            alert("Item deleted successfully!");
            fetchItems(); // Refresh list
        } else {
            alert("Failed to delete item. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item.");
    }
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Items</h2>

      {/* Category Dropdown */}
      <select
        className="border p-3 rounded-lg w-72 shadow-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat.category}>{cat.category}</option>
        ))}
      </select>

      {/* Items Table */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Items in {selectedCategory || "Selected Category"}</h3>

        {items.length === 0 ? (
          <p className="text-gray-600">No items found for this category.</p>
        ) : (
          <table className="w-full border-collapse border bg-white text-gray-900 shadow-md">
            <thead className="bg-gray-300 text-gray-900">
              <tr>
                <th className="border p-4 text-left font-semibold">Item Num</th>
                <th className="border p-4 text-left font-semibold">Item Name</th>
                <th className="border p-4 text-left font-semibold">Price (₹)</th>
                <th className="border p-4 text-left font-semibold">Status</th>
                <th className="border p-4 text-left font-semibold">Stock Qty</th>
                <th className="border p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.item_num} className="hover:bg-gray-100">
                  <td className="border p-4">{item.item_num}</td>
                  <td className="border p-4">{item.item_name}</td>
                  <td className="border p-4">₹{item.price}</td>
                  <td className="border p-4">{item.status}</td>
                  <td className="border p-4">{item.stock_qty}</td>
                  <td className="border p-4">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteItem(item.item_num)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Form */}
      {editingItem && (
      <div className="mt-6 bg-white p-8 rounded-lg shadow-lg w-4/5">
  <h3 className="text-2xl font-bold mb-6 text-gray-900">Edit Item</h3>

  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="border p-4 rounded w-full mb-4 text-gray-900 focus:ring-2 focus:ring-indigo-500"
    placeholder="Item Name"
  />

  <input
    type="text"
    name="price"
    value={formData.price}
    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
    className="border p-4 rounded w-full mb-4 text-gray-900 focus:ring-2 focus:ring-indigo-500"
    placeholder="Price"
  />

  <input
    type="text"
    name="status"
    value={formData.status}
    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    className="border p-4 rounded w-full mb-4 text-gray-900 focus:ring-2 focus:ring-indigo-500"
    placeholder="Status"
  />

  <input
    type="text"
    name="stock_qty"
    value={formData.stock_qty}
    onChange={(e) => setFormData({ ...formData, stock_qty: e.target.value })}
    className="border p-4 rounded w-full mb-4 text-gray-900 focus:ring-2 focus:ring-indigo-500"
    placeholder="Stock Qty"
  />

  <button
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
    onClick={handleUpdateItem}
  >
    Update Item
  </button>
</div>
      )}
    </div>
  );
};

export default ManageItems;