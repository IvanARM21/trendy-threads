import { CartProduct, ProductSize } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
    sizeSelect: ProductSize | null;
    quantity: string;
    cartProduct: CartProduct[];
    isActive: boolean;
    modalProductAdded: boolean;
    currentProductAdded: CartProduct | null;

    getTotalProducts: () => number;
    closeModalProductAdded: () => void;
    handleQuantity: (quantity: string) => void; 
    onClickQuantityPlus: () => void;
    onClickQuantityMinus: () => void;
    onSizeClick: (sizeSelect: ProductSize) => void;
    addProductCart: (cartProduct: CartProduct) => void;
    removeProductCart: (cartProduct: CartProduct) => void;
    editProductCart: (product: CartProduct) => void;
    
    getShippingPrice: () => number;
    getTaxPrice: () => number;
    getSubtotalPrice: () => number;
    getTotalPrice: () => number;

    openCart: () => void;
    closeCart: () => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            sizeSelect: null,
            quantity: "1",
            cartProduct: [],
            isActive: false,
            modalProductAdded: false,
            currentProductAdded: null,

            getTotalProducts: () => get().cartProduct.reduce((acc, product) => acc + product.quantity, 0),
            closeModalProductAdded: () => set(() => ({ modalProductAdded: false })),
            handleQuantity: (quantity) => set(() => ({ quantity })),
            onClickQuantityPlus: () => set((state) => ({ quantity: `${+(state.quantity) + 1}` })),
            onClickQuantityMinus: () => set((state) => ({ quantity: `${+(state.quantity) - 1}` })),
            onSizeClick: (sizeSelect) => set(() => ({ sizeSelect, quantity: "1" })),
            addProductCart: (cartProduct) => set((state) => {
                const product = state.cartProduct.find((product) => product.id === cartProduct.id && product.size.id === cartProduct.size.id);
                if(!product) {
                    return { cartProduct: [...state.cartProduct, cartProduct], modalProductAdded: true, currentProductAdded: cartProduct };
                }
                const cartUpdated = state.cartProduct.map(product => {
                    if (product.id === cartProduct.id && product.size.id === cartProduct.size.id) {
                        product.quantity += cartProduct.quantity;
                    }
                    return product;
                });
                return { cartProduct: cartUpdated, modalProductAdded: true, currentProductAdded: cartProduct };
            }),
            removeProductCart: (cartProduct) => set((state) => ({
                cartProduct: state.cartProduct.filter((product) => 
                    !(product.id === cartProduct.id && product.size === cartProduct.size)
                )
            })),
            editProductCart: (product) => set((state) => {
                const newCart = state.cartProduct.map(productState => {
                    if (productState.id === product.id && productState.size === product.size) {
                        productState.quantity = product.quantity;
                    }
                    return productState;
                })
                console.log(newCart);
                return { cartProduct: newCart };
            }),

            getShippingPrice: () => 12.99,
            getSubtotalPrice: () => get().cartProduct.reduce((acc, product) => acc + product.price * product.quantity, 0),
            getTaxPrice: () => get().getSubtotalPrice() * 0.21,
            getTotalPrice: () => (get().getShippingPrice() + get().getSubtotalPrice() + get().getTaxPrice()),

            openCart: () => set(() => ({ isActive: true })),
            closeCart: () => set(() => ({ isActive: false })),  
        }),
        {
            name: "cart-storage",
            partialize: (state) => ({ cartProduct: state.cartProduct }),
        }
    )
);

export { useCartStore };