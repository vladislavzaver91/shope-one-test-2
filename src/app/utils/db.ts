import { Product } from "@/types";

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`); // Отправляем GET-запрос на API

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const product: Product = await response.json(); // Парсим ответ в JSON
    return product; // Возвращаем продукт
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Возвращаем null в случае ошибки
  }
}
