import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebaseConfig";
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";


interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    userName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || null);
                } else {
                    setUserName(null);
                }
            } else {
                setUserName(null);
            }
        });

        return unsubscribe;
    }, []);


    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError(err.message)
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err: any) {
            console.error("Logout error:", err.message);
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout, userName }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};