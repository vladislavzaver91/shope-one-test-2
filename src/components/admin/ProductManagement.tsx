// ProductManagement.js
"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";

interface ProductManagementProps {
  products: Product[];
}

const ProductManagement = ({ products }: ProductManagementProps) => {
  const [form, setForm] = useState<Product>({
    id: "",
    title: "",
    description: "",
    price: 0,
    images: [],
    category: "",
    type: "Digital", // Default type can be Digital or Physical
    weight: undefined,
    dimensions: undefined,
    quantity: 0,
    colorsAvailable: [], // Добавлено поле для доступных цветов
    createdAt: new Date(), // Добавьте текущую дату
    updatedAt: new Date(), // Добавьте текущую дату
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
      setIsEditing(true);
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const resetForm = () => {
    setForm({
      id: "",
      title: "",
      description: "",
      price: 0,
      images: [],
      category: "",
      type: "Digital",
      weight: undefined,
      dimensions: undefined,
      quantity: 0,
      colorsAvailable: [], // Сброс массива доступных цветов
      createdAt: new Date(), // Добавьте текущую дату
      updatedAt: new Date(), // Добавьте текущую дату
    });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Update existing product
        await fetch(`/api/products/${form.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      } else {
        // Add new product
        await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, id: `product-${Date.now()}` }),
        });
      }

      resetForm(); // Reset form after submission
      // Optionally, refresh the product list here by re-fetching or updating state.
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      // Optionally refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Products</h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as "Digital" | "Physical" })
          }
          className="w-full p-2 border rounded-lg"
        >
          <option value="Digital">Digital</option>
          <option value="Physical">Physical</option>
        </select>

        <input
          type="text"
          placeholder="Image URLs (comma separated)"
          value={form.images.join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              images: e.target.value.split(",").map((url) => url.trim()),
            })
          }
          className="w-full p-2 border rounded-lg"
        />

        {/* Поле для ввода доступных цветов */}
        <input
          type="text"
          placeholder="Available Colors (comma separated)"
          value={form.colorsAvailable.join(", ")} // Преобразуем массив в строку для отображения
          onChange={(e) =>
            setForm({
              ...form,
              colorsAvailable: e.target.value
                .split(",")
                .map((color) => color.trim()), // Преобразуем строку обратно в массив
            })
          }
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Weight (optional)"
          value={form.weight || ""}
          onChange={(e) =>
            setForm({
              ...form,
              weight: parseFloat(e.target.value) || undefined,
            })
          }
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Dimensions (optional, e.g. LxWxH)"
          value={form.dimensions || ""}
          onChange={(e) =>
            setForm({ ...form, dimensions: e.target.value || undefined })
          }
          className="w-full p-2 border rounded-lg"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {products && products.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center">
              <span>{product.title}</span>
              <div>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsEditing(true);
                  }}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductManagement;
