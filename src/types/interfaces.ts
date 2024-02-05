/* eslint-disable no-unused-vars */
export interface Product {
  name: string;
  brand: string;
  categoryID: number;
  price: number | null;
  inStock: boolean;
  id: number;
  imageURL: string;
}

export interface Category {
  name: string;
  id: number;
}

export interface ProductCategoryData {
  categories: Category[];
  products: Product[];
}

export interface DatabaseState extends ProductCategoryData {
  filteredProducts: Product[];
  initialProducts: Product[];
  isLoaded: boolean;
}

export interface CartItem {
  id: number;
  brand: string;
  name: string;
  quantity: number;
  price: number | null;
  imageURL: string;
}
