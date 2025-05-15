import { create } from "zustand";
import { Product, ProductByQuery } from "@/interfaces/product.interface";

interface SearchProductModalState {
  products: ProductByQuery[];
  state: boolean;
  loading: boolean;
  query: string;
  productDetail: Product | null;
}

interface DashboardStore {
  showSidebar: boolean;
  hiddenSidebar: () => void; 
  openSidebar: () => void;

  deleteProduct: {
    productId: string | null;
    state: boolean;
    loading: boolean;
    dangerous: boolean;
  };

  searchProductModal: SearchProductModalState;
  updateSearchProductModal: (newState: SearchProductModalState) => void;
  openSearchProduct: () => void;
  closeSearchProduct: () => void;
  setProductsFound: (products: Product[]) => void;

  openDeleteProduct: (productId: string) => void;
  closeDeleteProduct: () => void;
}

const useDashboardStore = create<DashboardStore>()((set) => ({
  showSidebar: false,
  deleteProduct: {
    productId: null,
    state: false,
    loading: false,
    dangerous: false,
  },
  searchProductModal: {
    products: [],
    state: false,
    loading: false,
    query: "",
    productDetail: null,
  },

  // Función corregida con tipo explícito
  updateSearchProductModal: (newState: SearchProductModalState) => set(({ searchProductModal: newState })),

  openSearchProduct: () => 
    set((state) => ({ searchProductModal: { ...state.searchProductModal, state: true } })),

  closeSearchProduct: () => 
    set((state) => ({ searchProductModal: { ...state.searchProductModal, state: false } })),

  setProductsFound: (products) => 
    set((state) => ({ searchProductModal: { ...state.searchProductModal, products } })),

  hiddenSidebar: () => set(() => ({ showSidebar: false })),
  openSidebar: () => set(() => ({ showSidebar: true })),

  openDeleteProduct: (productId) => 
    set((state) => ({ deleteProduct: { ...state.deleteProduct, state: true, productId } })),

  closeDeleteProduct: () => 
    set((state) => ({ deleteProduct: { ...state.deleteProduct, state: false, productId: null } })),
}));

export { useDashboardStore };