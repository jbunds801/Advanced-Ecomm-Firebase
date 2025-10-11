// Integration Test

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';


jest.mock('../firebase/firebaseConfig', () => ({
    auth: {},
    db: {},
}));

jest.mock('../firebase/useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
}));


import UpdateProfile from '../components/User/UpdateProfile';
import { useAuth } from '../firebase/useAuth';
import { updateEmail, updatePassword } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';

describe('UpdateProfile Component', () => {
    const mockFetchUser = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuth as jest.Mock).mockReturnValue({
            currentUser: { uid: '123', email: 'old@test.com' },
            userProfile: {
                firstName: 'OldFirst',
                lastName: 'OldLast',
                email: 'old@test.com',
            },
            fetchUser: mockFetchUser,
        });
    });

    test('renders pre-filled data and updates user info when submitted', async () => {
        render(<UpdateProfile />);

        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Enter New Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm New Password');
        const updateButton = screen.getByRole('button', { name: /update/i });

        expect(firstNameInput).toHaveValue('OldFirst');
        expect(lastNameInput).toHaveValue('OldLast');
        expect(emailInput).toHaveValue('old@test.com');

        fireEvent.change(firstNameInput, { target: { value: 'NewFirst' } });
        fireEvent.change(lastNameInput, { target: { value: 'NewLast' } });
        fireEvent.change(emailInput, { target: { value: 'new@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'newpass123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newpass123' } });

        window.alert = jest.fn();

        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(updateEmail).toHaveBeenCalledWith(
                { uid: '123', email: 'old@test.com' },
                'new@test.com'
            );
            expect(updatePassword).toHaveBeenCalledWith(
                { uid: '123', email: 'old@test.com' },
                'newpass123'
            );
            expect(updateDoc).toHaveBeenCalled();
            expect(mockFetchUser).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith('Profile updated successfully!');
        });
    });

    test('shows alert if passwords do not match', () => {
        render(<UpdateProfile />);

        const passwordInput = screen.getByPlaceholderText('Enter New Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm New Password');
        const updateButton = screen.getByRole('button', { name: /update/i });

        window.alert = jest.fn();

        fireEvent.change(passwordInput, { target: { value: 'abc' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'xyz' } });
        fireEvent.click(updateButton);

        expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
    });
});
