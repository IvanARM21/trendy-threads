import { categories } from "./categories";
import { type Gender, ProductState } from "../interfaces/product.interface";

export const accessories = [
    {
      id: "cm6mflok6000808l8ghdw8gqw",
      name: "Chain One",
      price: 1290,
      slug: "chain-one",
      categoryId: categories[6].id,
      description: "",
      gender: "UNISEX" as Gender,
      isHighlighted: false,
      state: "ACTIVE" as ProductState,
      images: [
        { productId: "cm6mflok6000808l8ghdw8gqw", url: "/products/chain_1.webp" },
        { productId: "cm6mflok6000808l8ghdw8gqw", url: "/products/chain_2.webp" }
      ]
    },
    {
      id: "cm6mflok6000808l8ghdw8gwqe",
      name: "Chain Two",
      price: 2290,
      slug: "aviator-sunglasses",
      categoryId: categories[6].id,
      description: "",
      gender: "UNISEX" as Gender,
      isHighlighted: true,
      state: "ACTIVE" as ProductState,
      images: [
        { productId: "cm6mflok6000808l8ghdw8gwqe", url: "/products/chain_two_1.webp" },
        { productId: "cm6mflok6000808l8ghdw8gwqe", url: "/products/chain_two_2.webp" }
      ]
    },
    {
      id: "cm6mflok6000808l8ghdw8gdas",
      name: "Bracelet",
      price: 1590,
      slug: "leather-belt-brown",
      categoryId: categories[6].id,
      description: "",
      gender: "UNISEX" as Gender,
      isHighlighted: false,
      state: "ACTIVE" as ProductState,
      images: [
        { productId: "cm6mflok6000808l8ghdw8gdas", url: "/products/bracelet_1.webp" },
        { productId: "cm6mflok6000808l8ghdw8gdas", url: "/products/bracelet_2.webp" }
      ]
    },
  ];
  
  