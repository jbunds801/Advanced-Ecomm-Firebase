import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser, type User as FirebaseUser } from "firebase/auth";
import type { User } from '../types/types';


interface AuthContextType {
    currentUser: FirebaseUser | null;
    loading: boolean;
    userName: string | null;
    userProfile: User | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => Promise<void>;
    deleteProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<User | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data() as User;
                    setUserProfile(userData);
                    setUserName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || null);
                } else {
                    setUserProfile(null);
                    setUserName(null);
                }
            } else {
                setUserProfile(null);
                setUserName(null);
            }
        });

        return unsubscribe;
    }, []);


    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful in useAuth');
        } catch (err: any) {
            setError(err.message);
            console.error('Login error in useAuth:', err);
            throw err; // Re-throw so Login component can handle it
        }
    }

    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email: user.email,
                createdAt: new Date()
            });
            console.log('SignUp successful in useAuth');
        } catch (err: any) {
            setError(err.message);
            console.error('SignUp error in useAuth:', err);
            throw err; 
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err: any) {
            console.error("Logout error:", err.message);
        }
    }

    const deleteProfile = async () => {
        if (!currentUser) return;
        try {
            await deleteDoc(doc(db, 'users', currentUser.uid));
            await deleteUser(currentUser);
            alert('User profile deleted successfully.');
        } catch (err: any) {
            if (err.code === 'auth/requires-recent-login') {
                console.error('You need to re-login to delete your account.');
            } else {
                console.error('Error deleting user:', err.message);
                throw err;
            }
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout, signUp, userName, userProfile, deleteProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};