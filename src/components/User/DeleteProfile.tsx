import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useAuth } from '../../firebase/useAuth';


const DeleteProfile: React.FC = () => {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { currentUser, deleteProfile } = useAuth();

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000); // Reset after 3 seconds
            return;
        }

        if (!currentUser) {
            console.log('No user logged in');
            return;
        }

        try {
            await deleteProfile();
            alert('Profile deleted successfully');
        } catch (error) {
            alert('Error deleting profile:' + error);
        }
    }


    return (
        <>
            <Button className='text-nowrap' variant={confirmDelete ? 'outline-none text-danger' : 'outline-info'}
                onClick={handleDelete}>{confirmDelete ? "Confirm Delete? This action cannot be undone!"
                    : "Delete Profile"}</Button>
        </>
    );
};

export default DeleteProfile;