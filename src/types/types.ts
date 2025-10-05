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

//defines types used across components