// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// // Dummy fetch function (replace with your API call)
// async function getAdminDashboard() {
//   // Replace this with real API call
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve({
//         stats: {
//           totalUsers: 120,
//           totalProducts: 45,
//           totalOrders: 78,
//           totalRevenue: 123456,
//         },
//         recentOrders: [
//           {
//             _id: 'ORD001',
//             user: { firstName: 'John', lastName: 'Doe' },
//             totalAmount: 1200,
//             status: 'delivered',
//             createdAt: new Date().toISOString(),
//           },
//           {
//             _id: 'ORD002',
//             user: { firstName: 'Jane', lastName: 'Smith' },
//             totalAmount: 750,
//             status: 'processing',
//             createdAt: new Date().toISOString(),
//           },
//         ],
//       });
//     }, 500)
//   );
// }

// interface Stats {
//   totalUsers: number;
//   totalProducts: number;
//   totalOrders: number;
//   totalRevenue: number;
// }

// export default function AdminDashboard() {
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//   });
//   const [recentOrders, setRecentOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const result: any = await getAdminDashboard();
//       setStats(result.stats);
//       setRecentOrders(result.recentOrders);
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="card p-10 text-center">
//         <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//         <p className="text-black text-sm">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Stats */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="card-soft p-6 bg-pink-50 rounded-2xl shadow-md">
//           <p className="text-black/70 text-xs font-semibold uppercase tracking-[0.15em]">Total Users</p>
//           <p className="text-3xl font-extrabold text-black mt-2">{stats.totalUsers}</p>
//         </div>
//         <div className="card-soft p-6 bg-pink-50 rounded-2xl shadow-md">
//           <p className="text-black/70 text-xs font-semibold uppercase tracking-[0.15em]">Total Products</p>
//           <p className="text-3xl font-extrabold text-black mt-2">{stats.totalProducts}</p>
//         </div>
//         <div className="card-soft p-6 bg-pink-50 rounded-2xl shadow-md">
//           <p className="text-black/70 text-xs font-semibold uppercase tracking-[0.15em]">Total Orders</p>
//           <p className="text-3xl font-extrabold text-black mt-2">{stats.totalOrders}</p>
//         </div>
//         <div className="card-soft p-6 bg-pink-50 rounded-2xl shadow-md">
//           <p className="text-black/70 text-xs font-semibold uppercase tracking-[0.15em]">Total Revenue</p>
//           <p className="text-3xl font-extrabold text-black mt-2">
//             Rs {stats.totalRevenue.toLocaleString('en-IN')}
//           </p>
//         </div>
//       </section>

//       {/* Recent Orders */}
//       <section className="card p-6 bg-pink-50 rounded-2xl shadow-md">
//         <h3 className="text-xl font-bold text-black mb-4">Recent Orders</h3>
//         {recentOrders.length > 0 ? (
//           <table className="w-full text-black">
//             <thead className="bg-pink-100">
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Order ID</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Customer</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Total</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold uppercase">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-pink-100">
//               {recentOrders.map((order) => (
//                 <tr key={order._id} className="hover:bg-pink-50/60 transition">
//                   <td className="px-4 py-2 text-sm font-semibold">{order._id}</td>
//                   <td className="px-4 py-2 text-sm">{order.user.firstName} {order.user.lastName}</td>
//                   <td className="px-4 py-2 text-sm">Rs {order.totalAmount.toLocaleString('en-IN')}</td>
//                   <td className="px-4 py-2 text-sm capitalize">{order.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-4 text-sm text-black/60">No orders yet.</p>
//         )}
//       </section>
//     </div>
//   );
// }

'use client';

import AdminDashboard from './admin-dashboard-client';
import AdminShell from '../AdminShell';// Path to your AdminShell

export default function Page() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}