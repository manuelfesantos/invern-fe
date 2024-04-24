import CollectionsCarousel from '@/components/CollectionsCarousel';
import Layout from '@/components/Layout';
import React from 'react'

const Collections = () => {
    return (
      <Layout>
        <section className='h-full'>
          <div>
            <CollectionsCarousel />
          </div>
        </section>
      </Layout>
      );
}

export default Collections