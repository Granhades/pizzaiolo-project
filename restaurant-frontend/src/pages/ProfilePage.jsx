import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!userData || !userData.userId) {
            navigate("/login");
            return;
        }

        setUserInfo(userData);
        fetchOrders(userData.userId);
    }, []);

    const fetchOrders = async (userId) => {
        try {
            const res = await axios.get(`/api/order/user/${userId}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-white text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center">👤 Your Profile</h1>

            {userInfo && (
                <div className="bg-gray-100 rounded-lg p-4 shadow-md mb-8">
                    <p className="text-lg font-semibold">Name: {userInfo.name}</p>
                    <p className="text-lg font-semibold">Email: {userInfo.email}</p>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">📦 Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-600">No past orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">
                                        Order #{order.id.slice(-6)} – Table {order.table}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.createdAt || order.date).toLocaleString()}
                                    </p>
                                    <p>
                                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                                        items –{" "}
                                        {order.items
                                            .reduce(
                                                (sum, item) => sum + item.quantity * item.price,
                                                0
                                            )
                                            .toFixed(2)}
                                        €
                                    </p>
                                    <p className="text-sm mt-1">
                                        Status:{" "}
                                        <span className="font-medium text-blue-600">
                      {order.status}
                    </span>
                                    </p>
                                </div>
                                <button
                                    disabled
                                    className="bg-gray-300 text-gray-500 text-sm px-3 py-1 rounded cursor-not-allowed"
                                    title="Repeat Order (Coming Soon)"
                                >
                                    🔁 Repeat
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;