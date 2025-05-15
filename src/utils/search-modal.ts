import { ProductByQuery } from "@/interfaces/product.interface";

export const getLocalStorage = () =>
    JSON.parse(
      localStorage.getItem("recent-searches") || "[]"
    ) as ProductByQuery[];
  
export const setLocalStorage = (products: ProductByQuery[]) => 
    localStorage.setItem("recent-searches", JSON.stringify(products));

export const isSearchProducts = (products: ProductByQuery[], query : string) => {
if (products.length > 0 && query) {
      return products;
    } else {
      return getLocalStorage();
    }
}