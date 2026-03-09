'use client';

import { useRouter } from 'next/navigation';

export default function UserDashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/products')}
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition text-left"
                            >
                                🛍️ Browse Products
                            </button>
                            <button
                                onClick={() => router.push('/cart')}
                                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition text-left"
                            >
                                🛒 View Cart
                            </button>
                            <button
                                onClick={() => router.push('/orders')}
                                className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition text-left"
                            >
                                📦 My Orders
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Recent Orders</h3>
                        <p className="text-gray-500 text-sm">No recent orders</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Account</h3>
                        <p className="text-sm text-gray-600 mb-4">Manage your account settings</p>
                        <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                            View Profile
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
                    <p className="mb-6">Check out our latest collection of amazing products!</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
}
