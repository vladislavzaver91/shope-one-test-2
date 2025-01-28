import { Order } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

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
          const totalAmount = order.cartItems.reduce(
            (total, item) => total + item.price,
            0
          );

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
                      {order.cartItems.map((cartItem) => (
                        <li
                          key={cartItem.id}
                          className="flex bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                          <div className="relative flex-shrink-0 w-24 h-24 mr-4">
                            <Image
                              src={`${
                                cartItem.images
                                  ? cartItem.images
                                  : "/placeholder.jpg"
                              }`}
                              alt={cartItem.title}
                              fill
                              className="w-full h-full object-cover object-center rounded-lg shadow-md"
                            />
                          </div>
                          <div className="flex flex-col md:flex-row justify-between flex-1">
                            <div className="mb-2 md:mb-0 md:mr-4">
                              <p className="font-bold">{cartItem.title}</p>
                              <p className="text-gray-600">${cartItem.price}</p>
                              <p className="text-gray-600">
                                Quantity: {cartItem.quantity}
                              </p>
                            </div>

                            <div>{cartItem.description}</div>

                            <div className="flex flex-col w-20">
                              <p className="text-gray-600">{cartItem.type}</p>
                              <p className="text-gray-600">
                                {cartItem.category}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
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
