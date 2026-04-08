import { create } from 'zustand';
import { productService, type Product, type CreateProductPayload } from '../services/productService';

const ITEMS_PER_PAGE = 12;

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (payload: CreateProductPayload) => Promise<Product>;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

const applyFilter = (products: Product[], query: string) => {
  if (!query.trim()) return products;
  return products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await productService.getProducts(200, 0);
      const { searchQuery } = get();
      const filtered = applyFilter(products, searchQuery);
      set({
        products,
        filteredProducts: filtered,
        totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
        currentPage: 1,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false, error: 'Failed to fetch products.' });
    }
  },

  addProduct: async (payload: CreateProductPayload) => {
    const newProduct = await productService.createProduct(payload);
    const { products, searchQuery } = get();
    const updated = [newProduct, ...products];
    const filtered = applyFilter(updated, searchQuery);
    set({
      products: updated,
      filteredProducts: filtered,
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    });
    return newProduct;
  },

  setSearchQuery: (query: string) => {
    const { products } = get();
    const filtered = applyFilter(products, query);
    set({
      searchQuery: query,
      filteredProducts: filtered,
      currentPage: 1,
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1,
    });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
}));

export { ITEMS_PER_PAGE };
