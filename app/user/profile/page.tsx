'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/actions/profile-action';

interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function UserProfile() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [updateMessage, setUpdateMessage] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        // Get user data from cookie
        const cookies = document.cookie.split(';');
        const userDataCookie = cookies.find(c => c.trim().startsWith('userData='));
        if (userDataCookie) {
            try {
                const data = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
                setUserData(data);
                setProfileData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    password: '',
                });
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setUpdateMessage('');

        const updateData: any = {};
        if (profileData.firstName !== userData?.firstName) updateData.firstName = profileData.firstName;
        if (profileData.lastName !== userData?.lastName) updateData.lastName = profileData.lastName;
        if (profileData.email !== userData?.email) updateData.email = profileData.email;
        if (profileData.password) updateData.password = profileData.password;

        if (Object.keys(updateData).length === 0) {
            setUpdateMessage('No changes to update');
            setUpdating(false);
            return;
        }

        const result = await updateProfile(updateData);

        if (result.success) {
            setUpdateMessage('Profile updated successfully!');
            if (result.data) {
                setUserData(result.data);
            }
            setProfileData({ ...profileData, password: '' });
        } else {
            setUpdateMessage(result.message || 'Failed to update profile');
        }

        setUpdating(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-8">
                <button
                    onClick={() => router.back()}
                    className="text-pink-500 hover:underline mb-6"
                >
                    ← Back
                </button>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {userData?.firstName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="ml-6">
                            <h1 className="text-3xl font-bold">{userData?.firstName} {userData?.lastName}</h1>
                            <p className="text-gray-500">{userData?.email}</p>
                            <span className={`text-xs px-3 py-1 rounded-full ${userData?.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                {userData?.role === 'admin' ? 'Admin' : 'Customer'}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={profileData.password}
                                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                placeholder="Leave blank to keep current password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Leave blank if you don't want to change your password
                            </p>
                        </div>

                        {updateMessage && (
                            <div className={`p-4 rounded-xl ${updateMessage.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {updateMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold hover:opacity-95 transition disabled:opacity-50 shadow-[0_14px_30px_rgba(236,72,153,0.35)]"
                        >
                            {updating ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
