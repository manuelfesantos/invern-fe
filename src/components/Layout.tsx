import Header from "@/components/Header";
import Footer from "./Footer";
import React, { ReactNode } from 'react'
import Carousel from "./Carousel";
import Background from "./Background";

interface LayoutProps {
    children: ReactNode;
    showCarousel?: boolean;
}

const Layout: React.FC<LayoutProps> = ({children, showCarousel}) => {

    return (
        <div className='flex flex-col h-screen'>
            {
                showCarousel && <Carousel />
            }
            {
                !showCarousel && <Background />
            }
            <Header />
            <main className="flex flex-col flex-grow overflow-scroll">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout