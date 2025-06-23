import { useState, useEffect } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    // Filter orders based on search term (Order ID)
 const filteredOrders = orders.filter(order =>
    String(order.order_id).toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
       <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders Overview</h1>

  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search by Order ID..."
    className="border border-gray-300 p-3 rounded-lg w-full max-w-xl mb-6 shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {filteredOrders.length === 0 ? (
    <p className="text-gray-500 text-lg">No matching orders found.</p>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <table className="w-full border-collapse border text-gray-800">
        <thead className="bg-blue-100">
          <tr>
            <th className="border p-4 text-left font-semibold">Order ID</th>
            <th className="border p-4 text-left font-semibold">Name</th>
            <th className="border p-4 text-left font-semibold">Phone</th>
            <th className="border p-4 text-left font-semibold">Total</th>
            <th className="border p-4 text-left font-semibold">Payment ID</th>
            <th className="border p-4 text-left font-semibold">Date</th>
            <th className="border p-4 text-left font-semibold">Items & Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-4">{order.order_id}</td>
              <td className="border p-4">{order.name}</td>
              <td className="border p-4">{order.phone}</td>
              <td className="border p-4">₹{order.total}</td>
              <td className="border p-4">{order.payment_id}</td>
              <td className="border p-4">{new Date(order.date).toLocaleString()}</td>
              <td className="border p-4">{order.items.map(item => `${item.name} (${item.qty})`).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    );
};

export default Orders;