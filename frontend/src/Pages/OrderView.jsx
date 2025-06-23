import { useEffect, useState } from "react";
import axios from "axios";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const storedCustNum = localStorage.getItem("customer_number");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!storedCustNum) {
        console.error("No customer number found in localStorage.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/user-orders", {
          params: { cust_num: Number(storedCustNum) },
        });

        if (res.data.status === "success") {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
          console.warn("No orders exist for this customer.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response ? error.response.data : error);
      }
    };

    fetchOrders();
  }, [storedCustNum]);

  return (
    <div
      className="p-8 min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1525904097878-94fb15835963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3RzfGVufDB8MHwwfHx8MA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-white text-center bg-black bg-opacity-50 p-4 rounded-lg">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-white text-lg text-center bg-black bg-opacity-50 px-6 py-3 rounded-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {orders.map((order) => (
            <div key={order.order_id} className="bg-white p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Order ID: {order.order_id}</h3>
              <p className="text-gray-700"><strong>Total:</strong> ₹{order.total}</p>
              <p className="text-gray-700"><strong>Status:</strong> {order.payment_status}</p>
              <p className="text-gray-700"><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <h4 className="mt-4 text-gray-800 font-medium">Items:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} (Qty: {item.qty})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderView;