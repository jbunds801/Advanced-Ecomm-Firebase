/* import axios from "axios";
import type { Product } from "../types/types";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export async function fetchProducts() {
  const result = await apiClient.get("/products");
  return result.data as Product[];
}

export async function fetchCategories() {
  const result = await apiClient.get("/products/categories");
  return result.data as string[];
}

export async function fetchProductsByCategory(category: string) {
  const result = await apiClient.get(`/products/category/${category}`);
  return result.data as Product[];
}

//exporting the async functions that get data from the API making it reusable */