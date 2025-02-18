import { create } from "zustand";
import { Product } from "@/interfaces/product.interface";



interface DashboardStore {
    showSidebar: boolean;
    hiddenSidebar: () => void; 
    openSidebar: () => void;

    deleteProduct: {
        productId: string | null;
        state: boolean;
        loading: boolean;
        dangerous: boolean;
    }

    searchProductModal: {
        products: Product[];
        state: boolean;
        loading: boolean;
    }

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
        loading: false
    },

    openSearchProduct: () => set((state) => ({ searchProductModal: {...state.searchProductModal, state: true }})),
    closeSearchProduct: () => set((state) => ({ searchProductModal: {...state.searchProductModal, state: false} })),
    setProductsFound: (products) => set((state) => ({ searchProductModal: { ...state.searchProductModal, products }})),

    hiddenSidebar: () => set(() => ({ showSidebar: false })),
    openSidebar: () => set(() => ({ showSidebar: true })),

    openDeleteProduct: (productId) => set((state) => ({ 
        deleteProduct: { ...state.deleteProduct, state: true, productId } 
    })),
    closeDeleteProduct: () => set((state) => ({ 
        deleteProduct: { ...state.deleteProduct, state: false, productId: null } 
    })),
}));

export { useDashboardStore };