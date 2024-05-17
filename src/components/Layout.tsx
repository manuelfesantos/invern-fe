import Header from "@/components/Header";
import Footer from "./Footer";
import React, { ReactNode } from 'react'
import Carousel from "./Carousel";
import Background from "./Background";
import MobileMenu from "./MobileMenu";
import { getCollectionById,getCollections } from "@/utils/getFromDb";

interface LayoutProps {
    children: ReactNode;
    showCarousel?: boolean;
}

const Layout: React.FC<LayoutProps> = async ({children, showCarousel}) => {

    const collections = await getCollections()
    const collection = await getCollectionById(collections[collections.length-1].collectionId.toString())

    return (
        <div className='flex flex-col h-screen'>
            {
                showCarousel
                    ? <Carousel collection={collection} />
                    : <Background />
            }
            <Header />
            <MobileMenu />
            <main className="flex flex-col flex-grow overflow-scroll">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout