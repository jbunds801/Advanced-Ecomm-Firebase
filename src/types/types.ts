import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count?: number;
  };
  quantity?: number;
}

export interface CartState {
  cartItems: Product[];
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export interface Order {
    id: string;
    userId: string;
    products: {
        productId: string;
        title: string;
        price: number;
        quantity: number;
    }[];
    totalPrice: number;
    createdAt: Timestamp
}