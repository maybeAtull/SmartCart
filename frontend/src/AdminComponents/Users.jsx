import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
    });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users", formData);
            alert("User added successfully!");
            fetchUsers();
            setFormData({ name: "", phone: "", email: "", password: "", address: "" });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.cust_name,
            phone: user.cust_phn,
            email: user.cust_email,
            password: "",
            address: user.cust_add
        });
    };

const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
        if (!editingUser || !editingUser._id) {
            console.error("No user selected for update.");
            return;
        }

        console.log("Updating user:", editingUser._id);
        console.log("Form data being sent:", formData);

        await axios.put(
            `http://localhost:5000/api/users/${editingUser._id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        alert("User updated successfully!");
        fetchUsers();
        setEditingUser(null);
        setFormData({
            name: "",
            phone: "",
            email: "",
            password: "",
            address: "",
        });
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            alert("User deleted successfully!");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 text-gray-800 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

            {/* Add/Edit User Form */}
            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="mb-6 bg-white shadow-lg p-6 rounded-lg max-w-xl mx-auto flex flex-col space-y-3">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="border p-3 rounded focus:ring focus:ring-indigo-300"/>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="border p-3 rounded focus:ring focus:ring-indigo-300"/>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border p-3 rounded focus:ring focus:ring-indigo-300"/>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="border p-3 rounded focus:ring focus:ring-indigo-300"/>
                <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" rows="3" className="border p-3 rounded focus:ring focus:ring-indigo-300"></textarea>

                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold">
                    {editingUser ? "Update User" : "Add User"}
                </button>
            </form>

            {/* User List */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-indigo-500 text-white">
                            <th className="p-3 text-left">Customer Num</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{user.cust_num}</td>
                                <td className="p-3">{user.cust_name}</td>
                                <td className="p-3">{user.cust_phn}</td>
                                <td className="p-3">{user.cust_email}</td>
                                <td className="p-3">{user.cust_add}</td>
                                <td className="p-3 flex justify-end space-x-3">
                                    <button onClick={() => handleEditUser(user)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">Edit</button>
                                    <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;