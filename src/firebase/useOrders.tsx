// src/firebase/useOrders.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, Timestamp, } from 'firebase/firestore';
import type { Order } from '../types/types';
import { useAuth } from './useAuth';


interface OrdersContextType {
    orders: Order[];
    loading: boolean;
    error: string | null;
    fetchOrders: (userId?: string) => Promise<void>;
    createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
}


const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser, role } = useAuth();


    useEffect(() => {
        if (!currentUser) return;

        if (role === 'admin') {
            fetchOrders();
        } else {
            fetchOrders(currentUser.uid);
        }
    }, [currentUser, role]);


    const fetchOrders = async (userId?: string) => {
        setLoading(true);
        try {
            const ordersCollection = collection(db, 'orders');
            let q;

            if (userId) {
                q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
            } else {
                q = query(ordersCollection, orderBy('createdAt', 'desc'));
            }

            const snapshot = await getDocs(q);
            const fetchedOrders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Order[];

            setOrders(fetchedOrders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>) => {
        try {
            const orderWithDate = { ...order, createdAt: Timestamp.now() };
            await addDoc(collection(db, 'orders'), orderWithDate);

            if (order.userId) {
                await fetchOrders(order.userId);
            }

        } catch (err: unknown) {
            console.error('Error creating order:', err);
            throw err;
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'orders', id));
            if (currentUser) await fetchOrders(currentUser.uid);
        } catch (err: unknown) {
            console.error('Error deleting order:', err);
            throw err;
        }
    };


    return (
        <OrdersContext.Provider
            value={{
                orders, loading, error, fetchOrders, createOrder, deleteOrder,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) throw new Error('useOrders must be used within an OrdersProvider');
    return context;
};
