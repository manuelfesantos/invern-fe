"use client";
import React, { useState, useEffect } from "react";
import { getOrderById } from "@/service/order";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { convertPrice } from "@/utils/convertToCents";
import Link from "next/link";
import { CustomLinkButton } from "@/components/CustomComponents";

const getOrder = async (orderId: string) => {
  return await getOrderById(orderId);
};

function Order() {
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const params = useSearchParams();
  const orderId = params.get("id");

  const taxedAmount =
    (order?.payment.amount || 0) * (order?.address.country.taxes[0].rate || 0);

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
  return (
    <div className="h-full w-full flex flex-col items-center justify-start overflow-scroll">
      <div className="h-full w-full lg:h-[550px] lg:w-[500px] flex flex-col items-center justify-start px-12 py-8 lg:py-6 lg:px-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow overflow-scroll">
        {order ? (
          <>
            <h2>Thank you!</h2>
            <h4 className="text-center my-4">
              We are now processing your order and will contact you shortly.
            </h4>
            <div className="w-full h-[1px] bg-white my-4" />
            <h2 className="border-t-2 pt-8">Order Details</h2>
            <div className="my-4 text-center">
              <h3>Order id</h3>
              <p>{order.clientOrderId}</p>
            </div>
            <div className="my-4 text-center">
              <h3 className="mb-2">Products</h3>
              {order.products?.map((product: any, index: number) => (
                <div key={index} className="mb-4">
                  <ProductCard
                    product={product}
                    disableButtons
                    amountOrdered={product.quantity}
                  />
                </div>
              ))}
            </div>
            <h3>Address</h3>
            <div className="my-4 text-center grid grid-cols-2 gap-5">
              <div>
                <h4>Country</h4>
                <p>{order.address.country.name}</p>
              </div>
              <div>
                <h4>City</h4>
                <p>{order.address.city}</p>
              </div>
              <div>
                <h4>Line 1</h4>
                <p>{order.address.line1}</p>
              </div>
              <div>
                <h4>Line 2</h4>
                <p>{order.address.line2}</p>
              </div>
              <div>
                <h4>Postal Code</h4>
                <p>{order.address.postalCode}</p>
              </div>
            </div>
            <div className="my-4 text-center w-full sm:w-1/2 lg:w-full ">
              <h3>Payment</h3>
              <div className={"my-4"}>
                <div className="flex items-center justify-between">
                  <h4>Sub Total</h4>
                  <p>{convertPrice(order.payment.amount)}€</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4>{order.address.country.taxes[0].name}</h4>
                  <p>{order.address.country.taxes[0].rate}%</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4>Total Tax Amount</h4>
                  <p>{convertPrice(taxedAmount)}€</p>
                </div>
                <div className="flex items-center justify-between pb-4 border-b-2 mb-4">
                  <h4>Total Inc. VAT</h4>
                  <p>{convertPrice(order.payment.amount + taxedAmount)}€</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4>Payment Method</h4>
                  <p>{order.payment.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4>Payment Status</h4>
                  <p>{order.payment.state}</p>
                </div>
              </div>
            </div>
            <div className="my-4 text-center">
              <p className="mb-4">
                Missing information or incorrect information?
              </p>
              <CustomLinkButton
                href={"/contact"}
                type={"button"}
                position="h-10 w-60"
              >
                Please contact us
              </CustomLinkButton>
            </div>
          </>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Order;
