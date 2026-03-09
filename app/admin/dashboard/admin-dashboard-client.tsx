'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Dummy data
    setStats({
      totalUsers: 120,
      totalProducts: 45,
      totalOrders: 78,
      totalRevenue: 123456,
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-pink-50 rounded shadow">
          <p>Total Users</p>
          <p className="font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-pink-50 rounded shadow">
          <p>Total Products</p>
          <p className="font-bold">{stats.totalProducts}</p>
        </div>
        <div className="p-4 bg-pink-50 rounded shadow">
          <p>Total Orders</p>
          <p className="font-bold">{stats.totalOrders}</p>
        </div>
        <div className="p-4 bg-pink-50 rounded shadow">
          <p>Total Revenue</p>
          <p className="font-bold">Rs {stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}