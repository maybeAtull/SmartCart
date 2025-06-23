import React, { useEffect, useState, useCallback } from "react";

import axios from "axios";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleFilterAndSort = useCallback(() => {
    let data = [...payments];

    if (searchQuery.trim()) {
      data = data.filter((payment) =>
        String(payment.order_id).includes(searchQuery.trim())
      );
    }

    switch (sortOption) {
      case "amountAsc":
        data.sort((a, b) => a.total_amount - b.total_amount);
        break;
      case "amountDesc":
        data.sort((a, b) => b.total_amount - a.total_amount);
        break;
      case "nameAsc":
        data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameDesc":
        data.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        break;
    }

    setFilteredPayments(data);
  }, [payments, searchQuery, sortOption]);

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    handleFilterAndSort();
  }, [handleFilterAndSort]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data || []);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    }
  };


  return (
   <div className="p-8 bg-gradient-to-br from-[#1a233a] to-[#0b1220] min-h-screen text-gray-200">
  <h2 className="text-4xl font-extrabold mb-8 text-center">Payments Overview</h2>

  {/* Search and Sort Controls */}
  <div className="flex flex-col md:flex-row gap-6 mb-8">
    <input
      type="text"
      placeholder="Search by Order ID"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
    />

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
    >
      <option value="">Sort By</option>
      <option value="amountAsc">Amount (Low to High)</option>
      <option value="amountDesc">Amount (High to Low)</option>
      <option value="nameAsc">Name (A-Z)</option>
      <option value="nameDesc">Name (Z-A)</option>
    </select>
  </div>

  {/* Stylish Table */}
  <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg bg-gray-900">
    <table className="min-w-full text-sm md:text-base text-gray-300">
      <thead className="bg-gray-700 text-left text-gray-200">
        <tr>
          <th className="px-6 py-4">Payment ID</th>
          <th className="px-6 py-4">Order ID</th>
          <th className="px-6 py-4">Transaction ID</th>
          <th className="px-6 py-4">Amount</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Date</th>
        </tr>
      </thead>
      <tbody>
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <tr
              key={payment.payment_id}
              className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition"
            >
              <td className="px-6 py-4">{payment.payment_id}</td>
              <td className="px-6 py-4">{payment.order_id}</td>
              <td className="px-6 py-4">{payment.razorpay_payment_id || 'N/A'}</td>
              <td className="px-6 py-4">₹{payment.total_amount}</td>
              <td className="px-6 py-4">{payment.payment_status}</td>
              <td className="px-6 py-4">{payment.payment_date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-6 py-6 text-center text-gray-400">
              No payments found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


  );
};

export default Payment;
