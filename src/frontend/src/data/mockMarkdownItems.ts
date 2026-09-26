export type MarkdownItem = {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  newPrice: number;
  discountPercentage: number;
  stock: number;
};

export const markdownItemsByShop: Record<number, MarkdownItem[]> = {
  1: [
    {
      id: 1,
      name: "Ceramic Mug",
      category: "Homeware",
      originalPrice: 6,
      newPrice: 3,
      discountPercentage: 50,
      stock: 4,
    },
    {
      id: 2,
      name: "Red T-Shirt",
      category: "Clothing",
      originalPrice: 12,
      newPrice: 8,
      discountPercentage: 33,
      stock: 0,
    },
    {
      id: 3,
      name: "Paperback Book",
      category: "Books",
      originalPrice: 5,
      newPrice: 2.5,
      discountPercentage: 50,
      stock: 7,
    },
  ],

  2: [
    {
      id: 4,
      name: "Blue Jacket",
      category: "Clothing",
      originalPrice: 25,
      newPrice: 15,
      discountPercentage: 40,
      stock: 2,
    },
    {
      id: 5,
      name: "Glass Vase",
      category: "Homeware",
      originalPrice: 10,
      newPrice: 6,
      discountPercentage: 40,
      stock: 0,
    },
  ],

  3: [
    {
      id: 6,
      name: "Children's Puzzle",
      category: "Toys",
      originalPrice: 8,
      newPrice: 5,
      discountPercentage: 38,
      stock: 3,
    },
  ],
};