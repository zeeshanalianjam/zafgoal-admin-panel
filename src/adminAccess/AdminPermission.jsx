import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isAdmin } from './isAdmin';

const AdminPermission = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.admin);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // 500ms delay for loading simulation

        return () => clearTimeout(timer); // Cleanup
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500'></div>
                <p className='ml-4 text-gray-600'>Loading...</p>
            </div>
        )
    }

    return (
        <>
            {isAdmin(user.role) ? children : (
                <p className='text-red-600 bg-red-50 p-4'>You have no permission to access this source!</p>
            )}
        </>
    );
};

export default AdminPermission;