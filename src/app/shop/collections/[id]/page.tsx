import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { getCollectionById, getCollections } from "@/utils/getFromDb";
import ProductCardGrid from "@/components/ProductCardGrid";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const collection = await getCollectionById(params.id);

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center">
        {collection === undefined ? (
          <p>{`This collection is not available at the moment.`}</p>
        ) : (
          <>
            <div className="h-[40vh] lg:h-[80vh] w-full flex items-center">
              <div className="w-full flex flex-col lg:flex-row justify-center">
                <div className="flex gap-4 mt-6 px-12 lg:hidden">
                  <Link href="/shop/collections">
                    <FontAwesomeIcon
                      icon={faArrowTurnUp}
                      size="lg"
                      className="icon-scale mt-3 -rotate-90"
                    />
                  </Link>
                  <h2>{collection?.collectionName}</h2>
                </div>
                <div className="lg:hidden px-12 mt-4">
                  <hr />
                </div>
                <div className="hidden flex-1 lg:pl-36 lg:-mr-12 lg:block">
                  <h2>{collection?.collectionName}</h2>
                  <Link href="/shop/collections">
                    <FontAwesomeIcon
                      icon={faArrowTurnUp}
                      size="xl"
                      className="icon-scale -rotate-90 ml-2"
                    />
                  </Link>
                </div>
                <div className="mt-6 px-12 lg:hidden">
                  <p>{collection?.description}</p>
                </div>
                <div className="hidden flex-1 lg:pr-24 lg:block">
                  <p className="text-lg">{collection?.description}</p>
                </div>
              </div>
            </div>
            <ProductCardGrid products={collection?.products} />
          </>
        )}
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await getCollections();

  return posts.map((post: any) => ({
    id: post.collectionId,
  }));
}
