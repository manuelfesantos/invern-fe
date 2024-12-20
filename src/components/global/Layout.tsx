import Header from "@/components/global/Header";
import Footer from "./Footer";
import React, { ReactNode } from "react";
import Carousel from "../carousel/Carousel";
import Background from "./Background";
import MobileMenu from "../menu/MobileMenu";
import { getCollectionById, getCollections } from "@/utils/getFromDb";
import ValidateCountry from "@/components/global/ValidateCountry";

interface LayoutProps {
  children: ReactNode;
  showCarousel?: boolean;
}

const Layout: React.FC<LayoutProps> = async ({ children, showCarousel }) => {
  const collections = await getCollections();
  const collection = await getCollectionById(collections[0].id.toString());

  return (
    <div className="flex flex-col h-[100dvh]">
      {showCarousel ? <Carousel collection={collection} /> : <Background />}
      <Header />
      <main className="flex flex-col flex-grow overflow-scroll">
        {children}
      </main>
      <ValidateCountry />
      <Footer />
    </div>
  );
};

export default Layout;
