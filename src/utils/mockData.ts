import { Product } from "@/types";

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `Product ${i + 1}`,
  title: `Product ${i + 1}`, // changed from 'name' to 'title'
  description: `This is a description of product ${
    i + 1
  }. Perfect for both personal and professional use.`,
  price: parseFloat((Math.random() * 500).toFixed(2)),
  type: i % 2 === 0 ? "Physical" : "Digital",
  category: i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Books" : "Software",
  images: ["/watch-1.jpg", "/watch-2.jpg", "/watch-3.jpg"],

  // Add the missing properties to match the Product interface
  colorsAvailable: ["Red", "Blue", "Green"], // Example colors
  color: "Red", // Default color, could be dynamic
  quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
  weight: i % 2 === 0 ? 1.5 : null, // Optional weight for some items
  dimensions: i % 2 === 0 ? "10x5x2" : null, // Optional dimensions for some items
  createdAt: new Date(), // Using current date for createdAt
  updatedAt: new Date(), // Using current date for updatedAt
}));
