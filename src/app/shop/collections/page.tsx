import React from "react";
import Layout from "@/components/global/Layout";
import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/utils/getFromDb";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <Layout>
      <section className="relative h-full w-full flex flex-col lg:flex-row items-center lg:justify-center gap-2">
        <div className="lg:absolute lg:top-0 h-12 lg:h-36 w-full my-6 lg:my-0 flex flex-col items-center justify-center">
          <div className="lg:z-20">
            <h2>Collections</h2>
          </div>
        </div>
        {collections.length === 0 ? (
          <div className="absolute h-full w-full flex items-center justify-center px-24">
            <p>{`There are no collections available at the moment.`}</p>
          </div>
        ) : (
          collections.map((item, index) => (
            <div
              key={index}
              className="bg-[#201F1D] h-24 lg:h-full w-full lg:w-48 my-2 image-scale card-shadow"
            >
              <Link
                href={`/shop/collections/${item.collectionId}`}
                className="h-full w-full relative flex items-center justify-center"
              >
                <Image
                  src={item.image.url}
                  height={100}
                  width={100}
                  alt={item.image.alt}
                  className="h-full w-full object-cover mix-blend-overlay grayscale opacity-75 brightness-100 hover:mix-blend-exclusion hover:opacity-50 hover:brightness-150"
                />
                <div className="absolute pointer-events-none">
                  <h3>{item.collectionName}</h3>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
    </Layout>
  );
};

export default Collections;
