// AdminPage.js
"use client";

import OrderManagement from "@/components/admin/OrderManagement";
import ProductManagement from "@/components/admin/ProductManagement";
import { Order, Product } from "@/types";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products"); // Adjust the endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    };

    const fetchOrders = async () => {
      const response = await fetch("/api/orders"); // Adjust the endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductManagement products={products} />
        <OrderManagement orders={orders} />
      </div>
    </div>
  );
}
