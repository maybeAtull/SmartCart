import { useEffect, useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [formData, setFormData] = useState({
    item_num: "",
    category: "",
    item_name: "",
    price: "",
    status: "Available",
    stock_qty: "",
    image_link: "",
  });

  const [categories, setCategories] = useState([]); // Store fetched categories

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories_list"); // Updated API name
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch next available item_num
  useEffect(() => {
    const fetchNextItemNum = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items/next_available_item_num"); // Updated API name
        setFormData((prevData) => ({ ...prevData, item_num: res.data.next_item_num }));
      } catch (error) {
        console.error("Error fetching next item number:", error);
      }
    };

    fetchNextItemNum();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_link: reader.result });
    };
    reader.readAsDataURL(file);
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    const requiredFields = ["item_num", "category", "item_name", "price", "status", "stock_qty", "image_link"];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
        alert(`Error: Missing fields: ${missingFields.join(", ")}`);
        return;
    }

    try {
        const res = await axios.post("http://localhost:5000/api/items", formData);

        if (res.data.status === "success") {
            alert("Item added successfully!");
            setFormData({
                item_num: "",
                category: "",
                item_name: "",
                price: "",
                status: "Available",
                stock_qty: "",
                image_link: "",
            });
        } else {
            alert(`Error: ${res.data.message}`);
        }
    } catch (error) {
        console.error("Error adding item:", error.response ? error.response.data : error);
        alert("Failed to add item. Check console for details.");
    }
};

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Auto-populated Item Number (read-only) */}
        <input
          type="text"
          name="item_num"
          value={formData.item_num}
          readOnly
          className="border p-3 rounded w-full text-gray-500 bg-gray-100"
        />

        {/* Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded w-full text-gray-900 bg-gray-100"
        >
          <option value="">Select a Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.category}>{cat.category}</option>
          ))}
        </select>

        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Item Name"
          className="border p-3 rounded w-full text-gray-900"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-3 rounded w-full text-gray-900"
        />

        {/* Status Dropdown */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded w-full text-gray-900 bg-gray-100"
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          name="stock_qty"
          value={formData.stock_qty}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="border p-3 rounded w-full text-gray-900"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-3 rounded w-full bg-gray-100"
        />

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg w-full">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;