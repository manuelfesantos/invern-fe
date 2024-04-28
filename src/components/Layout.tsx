import Header from "@/components/Header";
import Footer from "./Footer";
import React, { ReactNode } from 'react'
import Carousel from "./Carousel";
import Background from "./Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
    children: ReactNode;
    showCarousel?: boolean;
}

const Layout: React.FC<LayoutProps> = ({children, showCarousel}) => {

    return (
        <div className='flex flex-col h-screen text-lg'>
            {
                showCarousel && <Carousel />
            }
            {
                !showCarousel && <Background />
            }
            <Header />
            <div className="absolute top-0 left-0 flex items-center justify-center h-full w-[5%] lg:hidden">
                <FontAwesomeIcon icon={faChevronLeft} className="h-96" />
            </div>
            <main className="flex flex-col flex-grow overflow-scroll">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout