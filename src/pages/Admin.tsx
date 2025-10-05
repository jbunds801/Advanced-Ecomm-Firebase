import React from 'react';
import { useAuth } from '../firebase/useAuth';
import AdminDashboard from '../components/Admin/AdminDashboard';

const Admin: React.FC = () => {
    const { currentUser, role, loading } = useAuth();

    if (loading) {
        return <h3>Loading...</h3>
    }


    return (
        <>
            {currentUser && role === 'admin' ? (
                <div>
                    <h1 className='p-4' >Admin Dashboard</h1>
                    <AdminDashboard />
                </div>
            ) : (
                <div>
                    <h1 className='p-4'>Access Denied</h1>
                    <p className='px-4'>You do not have permission to view this page.</p>
                </div>
            )}
        </>
    );
};


export default Admin;