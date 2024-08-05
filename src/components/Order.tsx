"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getOrderById } from "@/service/order";
import { useSearchParams } from "next/navigation";

const getOrder = async (orderId: string) => {
  return await getOrderById(orderId);
};

function Order() {
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const params = useSearchParams();
  const orderId = params.get("id");

  useEffect(() => {
    console.log("order id: ", orderId);
    let newOrder: any;
    let attempts = 0;
    const loadOrder = async () => {
      if (orderId) {
        const order = await getOrder(orderId);
        if (order) {
          console.log("order", order);
          newOrder = order;
        }
      }
    };

    const tryLoadOrder = async () => {
      await loadOrder();
      while (!newOrder && attempts < 10) {
        attempts++;
        await new Promise((resolve) => setTimeout(loadOrder, 1000));
      }
      if (!newOrder) {
        setError("Order not found");
        return;
      }
      setOrder(newOrder);
    };
    tryLoadOrder();
  }, [orderId]);
  return order ? (
    <div>
      <p>Order Id: {order.clientOrderId}</p>
      <p>Created At: {order.createdAt}</p>
      <ul>
        {order.products?.map((product: any) => (
          <li key={product.productId}>
            <p>Product Id: {product.productId}</p>
            <p>Product Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
      <p>Payment Id: {order.payment.paymentId}</p>
      <p>Payment State: {order.payment.state}</p>
    </div>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <p>Loading...</p>
  );
}

export default Order;
