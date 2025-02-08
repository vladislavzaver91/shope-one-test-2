import { Order, Product } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderHistoryProps {
  orders: Order[];
  products: Product[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [products, setProducts] = useState<Product[]>([]); // Local state for products
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!orders.length) {
    return <p className="text-gray-500">You have no orders yet.</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Order history
      </h2>
      <ul className="space-y-4">
        {orders.map((order) => {
          const totalAmount = order.productIds.reduce((total, productId) => {
            const product = products.find((p) => p.id === productId); // Find the product details
            if (product) {
              return total + product.price * (product.quantity || 1); // Calculate total based on quantity
            }
            return total;
          }, 0);

          const isDetailsOpen = openOrderId === order.id;

          return (
            <li
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p>Date: {order.createdAt}</p>
              <p>Total amount: ${totalAmount.toFixed(2)}</p>
              <button
                onClick={() => setOpenOrderId(isDetailsOpen ? null : order.id)}
                className="text-blue-600 hover:underline mt-2"
              >
                {isDetailsOpen ? "Hide Details" : "Details"}
              </button>

              <div
                className={clsx(
                  "transform transition-all duration-300 ease-in-out overflow-hidden",
                  isDetailsOpen
                    ? "max-h-[450px] opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="mt-4 p-4 bg-gray-100 border-t border-gray-300 h-[500px] overflow-y-auto">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">
                        Order #{order.id}
                      </h3>
                      <p className="mb-4">Date: {order.createdAt}</p>
                      <p>Payment method: {order.paymentMethod}</p>
                    </div>
                    <p className="font-semibold text-lg">
                      Total amount: ${totalAmount.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <ul className="space-y-4">
                      {order.productIds.map((productId) => {
                        const product = products.find(
                          (p) => p.id === productId
                        );
                        if (!product) return null;

                        return (
                          <li
                            key={product.id}
                            className="flex bg-white p-4 rounded-lg shadow-md border border-gray-200"
                          >
                            <div className="relative flex-shrink-0 w-24 h-24 mr-4">
                              <Image
                                src={product.images?.[0] || "/placeholder.jpg"}
                                alt={product.title}
                                fill
                                className="w-full h-full object-cover object-center rounded-lg shadow-md"
                              />
                            </div>
                            <div className="flex flex-col md:flex-row justify-between flex-1">
                              <div className="mb-2 md:mb-0 md:mr-4">
                                <p className="font-bold">{product.title}</p>
                                <p className="text-gray-600">
                                  ${product.price}
                                </p>
                                <p className="text-gray-600">
                                  Quantity: {product.quantity}
                                </p>
                              </div>

                              <div>{product.description}</div>

                              <div className="flex flex-col w-20">
                                <p className="text-gray-600">{product.type}</p>
                                <p className="text-gray-600">
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OrderHistory;
