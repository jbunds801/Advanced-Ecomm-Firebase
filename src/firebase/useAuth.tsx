import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebaseConfig";
import { doc, getDoc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser, type User as FirebaseUser } from "firebase/auth";
import type { User } from '../types/types';


interface AuthContextType {
    currentUser: FirebaseUser | null;
    loading: boolean;
    error: string | null;
    userName: string | null;
    userProfile: User | null;
    role?: string | null;
    fetchUser: () => Promise<void>;
    fetchUsers: () => Promise<User[]>;
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
    const [role, setRole] = useState<string | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data() as User;
                    setUserProfile(userData);
                    setUserName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || null);
                    setRole(userData.role || null);
                } else {
                    setUserProfile(null);
                    setUserName(null);
                    setRole(null);
                }
                setLoading(false);
            } else {
                setUserProfile(null);
                setUserName(null);
                setRole(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const fetchUser = async () => {
        if (!currentUser) return;
        setLoading(true)

        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data() as User;
            setUserProfile(userData);
            setUserName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || null);
            setRole(userData.role || null);
        } else {
            setUserProfile(null);
            setUserName(null);
            setRole(null);
        }
        setLoading(false)
    };

    const fetchUsers = async (): Promise<User[]> => {
        const snapshot = await getDocs(collection(db, 'users'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful in useAuth');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Login error in useAuth:', err);
            throw err;
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
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('SignUp error in useAuth:', err);
            throw err;
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err: unknown) {
            console.error("Logout error:", err instanceof Error ? err.message : 'An error occurred');
        }
    }

    const deleteProfile = async () => {
        if (!currentUser) return;
        try {
            await deleteDoc(doc(db, 'users', currentUser.uid));
            await deleteUser(currentUser);
        } catch (err: unknown) {
            if (err instanceof Error && 'code' in err && err.code === 'auth/requires-recent-login') {
                console.error('You need to re-login to delete your account.');
                throw err;
            } else {
                console.error('Error deleting user:', err instanceof Error ? err.message : 'An error occurred');
                throw err;
            }
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, loading, error, role, userName, userProfile, fetchUser, fetchUsers, login, logout, signUp, deleteProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};