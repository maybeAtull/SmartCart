import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/queries'); // Update endpoint as needed
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleDelete = async (contact_id) => {
    try {
      await axios.delete(`http://localhost:5000/queries/${contact_id}`);
      setQueries(queries.filter(q => q.contact_id !== contact_id));
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  const handleReply = async (contact_id) => {
    try {
      await axios.put(`http://localhost:5000/queries/${contact_id}`, { replied: true });
      fetchQueries(); // Refresh to reflect changes
    } catch (error) {
      console.error('Error replying to query:', error);
    }
  };

  const filteredQueries = queries.filter(q =>
    q.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Queries</h2>

      <input
        type="text"
        placeholder="Search by email..."
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="w-full p-2 mb-6 border rounded"
      />

      {filteredQueries.length > 0 ? (
        filteredQueries.map((query) => (
          <div key={query.contact_id} className="mb-4 p-4 border rounded shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{query.name}</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  query.replied ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {query.replied ? 'Replied' : 'Pending'}
              </span>
            </div>
            <p className="text-gray-600 mb-1"><strong>Email:</strong> {query.email}</p>
            <p className="text-gray-800 mb-2">{query.message}</p>
            <p className="text-sm text-gray-400 mb-3"><strong>Date:</strong> {query.date || 'N/A'}</p>

            <div className="flex gap-4">
              <button
                onClick={() => handleReply(query.contact_id)}
                disabled={query.replied}
                className={`px-4 py-2 text-white rounded ${
                  query.replied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Reply
              </button>
              <button
                onClick={() => handleDelete(query.contact_id)}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No queries found.</p>
      )}
    </div>
  );
};

export default Queries;
