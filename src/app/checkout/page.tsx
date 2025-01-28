"use client";

import { useCart } from "@/helpers/context/CartContext";
import { Address } from "@/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ShippingForm = dynamic(
  () => import("../../components/checkout/ShippingForm"),
  {
    ssr: false,
  }
);

// const PaymentMethodSelector = dynamic(
// 	() => import('../../components/checkout/PaymentMethodSelector'),
// 	{
// 		ssr: false,
// 	}
// )

const StripeCheckout = dynamic(
  () => import("../../components/checkout/StripeCheckout"),
  {
    ssr: false,
  }
);

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<Address | null>(null);
  // const [paymentMethod, setPaymentMethod] = useState('')
  const { cart } = useCart();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setStep(2);
  };

  // const handlePaymentMethodSelect = (method: string) => {
  // 	setPaymentMethod(method)
  // 	setStep(3)
  // }

  const handleCompleteOrder = async () => {
    if (!shippingData || cart.length === 0) {
      console.log("Please, fill in all details.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const productIds = cart.map((product) => product.id);
    const deliveryAddress = shippingData.address;

    const newOrder = {
      userId: userId,
      productIds: productIds,
      status: "Pending",
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      deliveryAddress: deliveryAddress,
    };

    console.log(newOrder);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      console.log("Order created!", result);
      setShippingData(null);
      // setPaymentMethod('')
      router.push("/");
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
      {/* {step === 2 && (
				<PaymentMethodSelector onSelect={handlePaymentMethodSelect} />
			)} */}
      {step === 2 && <StripeCheckout onCompleteOrder={handleCompleteOrder} />}
    </div>
  );
}
