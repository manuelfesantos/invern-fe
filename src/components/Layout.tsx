import Header from "@/components/Header";
import Footer from "./Footer";
import React, { ReactNode } from 'react'
import Carousel from "./Carousel";

interface LayoutProps {
    children: ReactNode;
    showCarousel?: boolean;
}

const Layout: React.FC<LayoutProps> = ({children, showCarousel}) => {

    return (
        <div className='flex flex-col min-h-screen'>
            {
                showCarousel && <Carousel />
            }
            <Header />
            <main className="flex flex-col flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout