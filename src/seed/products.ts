import { Gender } from "../interfaces/product.interface";
import { ProductState } from "../interfaces/product.interface";
import { categories } from "./categories";
import { sizes } from './sizes';

export const products = [
    // Men Products
    {
        id: "cm6mfhboj000008jwc0mkffkr",
        name: "Oversize T-shirt black",
        price: 699,
        slug: "oversize-t-shirt-black",
        categoryId: categories[0].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                url: "/products/18ffd7a0-8822-4d3a-b4dd-f077b13228d8.webp"
            },
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                url: "/products/6d7367d8-a859-4005-933d-02fe534d14c7.webp"
            }
        ],
        sizes: [
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mfhboj000008jwc0mkffkr",
                sizeId: sizes[5].id,
                stock: 8
            }
        ]
    },
    {
        id: "cm6mfhua7000108jwh063hxib",
        name: "Oversize T-shirt grey",
        price: 699,
        slug: "oversize-t-shirt-grey",
        categoryId: categories[0].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                productId: "cm6mfhua7000108jwh063hxib",
                url: "/products/7bdedd79-125a-40d9-92a2-f2ad27da9e72.webp"
            },
            {
                productId: "cm6mfhua7000108jwh063hxib",
                url: "/products/86e9d3fd-72b5-4a31-829b-7b13686ad2d1.webp"
            }
        ],
        sizes: [
            {
                productId: "cm6mfhua7000108jwh063hxib",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mfhua7000108jwh063hxib",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mfhua7000108jwh063hxib",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mfhua7000108jwh063hxib",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mfhua7000108jwh063hxib",
                sizeId: sizes[5].id,
                stock: 8
            }
        ]
    },
    {
        id: "cm6mfi9yw000008l87hy3740z",
        name: "Baggy Fit Black Cargo",
        price: 1990,
        slug: "baggy-fit-black-cargo",
        categoryId: categories[1].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                url: "/products/04720437800-p.jpg"
            },
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                url: "/products/04720437800-a2.jpg"
            }
        ],
        sizes: [
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mfi9yw000008l87hy3740z",
                sizeId: sizes[5].id,
                stock: 8
            }
        ]
    },
    {
        id: "cm6mfioke000108l85bok4chi",
        name: "Baggy Fit Black Jean",
        price: 1990,
        slug: "baggy-fit-black-jean",
        categoryId: categories[1].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                productId: "cm6mfioke000108l85bok4chi",
                url: "/products/04806401800-p.jpg"
            },
            {
                productId: "cm6mfioke000108l85bok4chi",
                url: "/products/04806401800-a2.jpg"
            }
        ],
        sizes: [
            {
                productId: "cm6mfioke000108l85bok4chi",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mfioke000108l85bok4chi",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mfioke000108l85bok4chi",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mfioke000108l85bok4chi",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mfioke000108l85bok4chi",
                sizeId: sizes[5].id,
                stock: 8
            }
        ]
    },
    {
        id: "cm6mfj4oh000208l8b54414b8",
        name: "Suit Jacket in 100% Linen",
        price: 159.90,
        slug: "suit-jacket-in-100%-linen",
        categoryId: categories[2].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                url: "/products/04299333052-p.jpg"
            },
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                url: "/products/04299333052-a2.jpg"
            }
        ],
        sizes: [
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mfj4oh000208l8b54414b8",
                sizeId: sizes[5].id,
                stock: 8
            }
        ]
    },
    {
        id: "cm6mmsf9l000008l5hv1ofa0v",
        name: "Slim Fit Suit Jacket",
        price: 3990,
        slug: "suit-jacket-in-100%-linen",
        categoryId: categories[2].id,
        description: "",
        // stock: null,
        gender: "MEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
            {
                url: "/products/09722605800-a1.jpg",
                productId: "cm6mmsf9l000008l5hv1ofa0v"
            },
            {
                url: "/products/09722605800-a2.jpg",
                productId: "cm6mmsf9l000008l5hv1ofa0v"
            }
        ],
        sizes: [
            {
                productId: "cm6mmsf9l000008l5hv1ofa0v",
                sizeId: sizes[1].id,
                stock: 6
            },
            {
                productId: "cm6mmsf9l000008l5hv1ofa0v",
                sizeId: sizes[2].id,
                stock: 12
            },
            {
                productId: "cm6mmsf9l000008l5hv1ofa0v",
                sizeId: sizes[3].id,
                stock: 15
            },
            {
                productId: "cm6mmsf9l000008l5hv1ofa0v",
                sizeId: sizes[4].id,
                stock: 12
            },
            {
                productId: "cm6mmsf9l000008l5hv1ofa0v",
                sizeId: sizes[5].id,
                stock: 8
            }
        ],
    },

    // Women
    {
        id: "cm6mfjutv000408l8159f2r8f",
        name: "Button vest",
        price: 3990,
        slug: "button-vest",
        categoryId: categories[3].id,
        description: "",
        // stock: null,
        gender: "WOMEN" as Gender,
        isHighlighted: false,
        state: "ACTIVE" as ProductState,
        images: [
          {
            productId: "cm6mfjutv000408l8159f2r8f",
            url: "/products/05584964719-a2.jpg"
          },
          {
            productId: "cm6mfjutv000408l8159f2r8f",
            url: "/products/05584964719-a1.jpg"
          }
        ],
        sizes: [
          {
            sizeId: sizes[1].id,
            stock: 6,
            productId: "cm6mfjutv000408l8159f2r8f"
          },
          {
            sizeId: sizes[2].id,
            stock: 12,
            productId: "cm6mfjutv000408l8159f2r8f"
          },
          {
            sizeId: sizes[3].id,
            stock: 15,
            productId: "cm6mfjutv000408l8159f2r8f"
          },
          {
            sizeId: sizes[4].id,
            stock: 12,
            productId: "cm6mfjutv000408l8159f2r8f"
          },
          {
            sizeId: sizes[5].id,
            stock: 8,
            productId: "cm6mfjutv000408l8159f2r8f"
          }
        ]
    },
    {
    id: "cm6mfk9kr000508l8alqvflfa",
    name: "Top Brown",
    price: 3990,
    slug: "top-brown",
    categoryId: categories[3].id,
    description: "",
    // stock: null,
    gender: "WOMEN" as Gender,
    isHighlighted: false,
    state: "ACTIVE" as ProductState,
    images: [
        {
        productId: "cm6mfk9kr000508l8alqvflfa",
        url: "/products/03641020716-a1.jpg"
        },
        {
        productId: "cm6mfk9kr000508l8alqvflfa",
        url: "/products/03641020716-a2.jpg"
        }
    ],
    sizes: [
        {
        sizeId: sizes[1].id,
        stock: 6,
        productId: "cm6mfk9kr000508l8alqvflfa"
        },
        {
        sizeId: sizes[2].id,
        stock: 12,
        productId: "cm6mfk9kr000508l8alqvflfa"
        },
        {
        sizeId: sizes[3].id,
        stock: 15,
        productId: "cm6mfk9kr000508l8alqvflfa"
        },
        {
        sizeId: sizes[4].id,
        stock: 12,
        productId: "cm6mfk9kr000508l8alqvflfa"
        },
        {
        sizeId: sizes[5].id,
        stock: 8,
        productId: "cm6mfk9kr000508l8alqvflfa"
        }
    ]
    },
    {
    id: "cm6mfkm8g000608l86xfk5nvn",
    name: "Jeans Tailored Ballon Tiro Mid Blue",
    price: 3990,
    slug: "jeans-tailored-ballon-tiro-mid-blue",
    categoryId: categories[4].id,
    description: "",
    // stock: null,
    gender: "WOMEN" as Gender,
    isHighlighted: false,
    state: "ACTIVE" as ProductState,
    images: [
        {
        productId: "cm6mfkm8g000608l86xfk5nvn",
        url: "/products/08727217407-p.jpg"
        },
        {
        productId: "cm6mfkm8g000608l86xfk5nvn",
        url: "/products/08727217407-a2.jpg"
        }
    ],
    sizes: [
        {
        sizeId: sizes[1].id,
        stock: 6,
        productId: "cm6mfkm8g000608l86xfk5nvn"
        },
        {
        sizeId: sizes[2].id,
        stock: 12,
        productId: "cm6mfkm8g000608l86xfk5nvn"
        },
        {
        sizeId: sizes[3].id,
        stock: 15,
        productId: "cm6mfkm8g000608l86xfk5nvn"
        },
        {
        sizeId: sizes[4].id,
        stock: 12,
        productId: "cm6mfkm8g000608l86xfk5nvn"
        },
        {
        sizeId: sizes[5].id,
        stock: 8,
        productId: "cm6mfkm8g000608l86xfk5nvn"
        }
    ]
    },
    {
    id: "cm6mhfkey000408jp7s5g4msx",
    name: "Jeans Tailored Ballon Tiro Mid Grey",
    price: 3990,
    slug: "jeans-tailored-ballon-tiro-mid-grey",
    categoryId: categories[4].id,
    description: "",
    // stock: null,
    gender: "WOMEN" as Gender,
    isHighlighted: false,
    state: "ACTIVE" as ProductState,
    images: [
        {
        productId: "cm6mhfkey000408jp7s5g4msx",
        url: "/products/08197223809-p.jpg"
        },
        {
        productId: "cm6mhfkey000408jp7s5g4msx",
        url: "/products/08197223809-a2.jpg"
        }
    ],
    sizes: [
        {
        sizeId: sizes[1].id,
        stock: 6,
        productId: "cm6mhfkey000408jp7s5g4msx"
        },
        {
        sizeId: sizes[2].id,
        stock: 12,
        productId: "cm6mhfkey000408jp7s5g4msx"
        },
        {
        sizeId: sizes[3].id,
        stock: 15,
        productId: "cm6mhfkey000408jp7s5g4msx"
        },
        {
        sizeId: sizes[4].id,
        stock: 12,
        productId: "cm6mhfkey000408jp7s5g4msx"
        },
        {
        sizeId: sizes[5].id,
        stock: 8,
        productId: "cm6mhfkey000408jp7s5g4msx"
        }
    ]
    },
    {
    id: "cm6mfle7i000708l89cpodabn",
    name: "Drapped Midi Dress Black",
    price: 1890,
    slug: "drapped-midi-dress-black",
    categoryId: categories[5].id,
    description: "",
    // stock: null,
    gender: "WOMEN" as Gender,
    isHighlighted: false,
    state: "ACTIVE" as ProductState,
    images: [
        {
            productId: "cm6mfle7i000708l89cpodabn",
         url: "/products/04772962514-a1.jpg"
        },
        {
            productId: "cm6mfle7i000708l89cpodabn",
            url: "/products/04772962514-a2.jpg"
        }
    ],
    sizes: [
        {
        sizeId: sizes[1].id,
        stock: 6,
        productId: "cm6mfle7i000708l89cpodabn"
        },
        {
        sizeId: sizes[2].id,
        stock: 12,
        productId: "cm6mfle7i000708l89cpodabn"
        },
        {
        sizeId: sizes[3].id,
        stock: 15,
        productId: "cm6mfle7i000708l89cpodabn"
        },
        {
        sizeId: sizes[4].id,
        stock: 12,
        productId: "cm6mfle7i000708l89cpodabn"
        },
        {
        sizeId: sizes[5].id,
        stock: 8,
        productId: "cm6mfle7i000708l89cpodabn"
        }
    ]
    },
    {
    id: "cm6mflok6000808l8ghdw8gwa",
    name: "Drapped Midi Dress Grey",
    price: 1890,
    slug: "drapped-midi-dress-grey",
    categoryId: categories[5].id,
    description: "",
    // stock: null,
    gender: "WOMEN" as Gender,
    isHighlighted: false,
    state: "ACTIVE" as ProductState,
    images: [
        {
        productId: "cm6mflok6000808l8ghdw8gwa",
        url: "/products/04772962800-a1.jpg"
        },
        {
        productId: "cm6mflok6000808l8ghdw8gwa",
        url: "/products/04772962800-a2.jpg"
        }
    ],
    sizes: [
        {
        sizeId: sizes[1].id,
        stock: 6,
        productId: "cm6mflok6000808l8ghdw8gwa"
        },
        {
        sizeId: sizes[2].id,
        stock: 12,
        productId: "cm6mflok6000808l8ghdw8gwa"
        },
        {
        sizeId: sizes[3].id,
        stock: 15,
        productId: "cm6mflok6000808l8ghdw8gwa"
        },
        {
        sizeId: sizes[4].id,
        stock: 12,
        productId: "cm6mflok6000808l8ghdw8gwa"
        },
        {
        sizeId: sizes[5].id,
        stock: 8,
        productId: "cm6mflok6000808l8ghdw8gwa"
        }
    ]
    }
]