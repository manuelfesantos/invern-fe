import React, {Suspense} from 'react'
import Layout from '@/components/Layout'
import Login from '@/components/Login';

const LoginPage = () => {
  return (
    <Layout>
        <Suspense>
      <Login />
        </Suspense>
    </Layout>
  )
}

export default LoginPage