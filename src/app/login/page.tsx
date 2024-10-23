import React, { Suspense } from "react";
import Layout from "@/components/global/Layout";
import Login from "@/components/login-page/Login";

const LoginPage = () => {
  return (
    <Layout>
      <Suspense>
        <Login />
      </Suspense>
    </Layout>
  );
};

export default LoginPage;
