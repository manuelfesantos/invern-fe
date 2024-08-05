import Layout from "@/components/Layout";
import Order from "@/components/Order";
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
