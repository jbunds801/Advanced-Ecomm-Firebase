export interface Product {
  id: number;
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

//defines types used across components