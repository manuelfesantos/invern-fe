import Layout from "@/components/global/Layout";
import Order from "@/components/order/Order";
import { Suspense } from "react";

const OrderPage = () => {
  return (
    <Layout>
      <Suspense>
        <Order />
      </Suspense>
    </Layout>
  );
};

export default OrderPage;
