import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Appbar } from '../components/Appbar';
import { useNavigate } from 'react-router-dom';

export const ProfileEdit = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUpdateProfile = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/blog/profile`, {
                displayName,
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response){
                setMessage("Profile updated successfully.");
                navigate('/blogs');
            }
        } catch (error) {   
            setMessage("Error updating profile. Please try again.");
        }
    };

    return (
        <div>
            <Appbar name={localStorage.getItem("name") || "Anonymous"} />
            <div className="flex justify-center w-full pt-20 px-4 sm:px-6 lg:px-8 mt-24 ">
                <div className="max-w-screen-md w-full">
                    <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="displayName">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="currentPassword">Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {message && <div className="mb-4 text-red-500">{message}</div>}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleUpdateProfile}
                            className="px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
