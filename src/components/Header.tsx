import Link from "next/link";
import Image from 'next/image';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faYoutube, faPinterestP} from "@fortawesome/free-brands-svg-icons"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import ShopMenu from "./ShopMenu";
import Newsletter from "./Newsletter";
import MobileMenu from "./MobileMenu";
import LoginWindow from "./LoginWindow";
import CartItemsCounter from "@/components/CartItemsCounter";

export default function Header() {

    return (
        <nav className="flex flex-col z-30 relative select-none">
            <div className="flex justify-between pt-6 pb-2 px-12">
                <div className="hidden lg:flex gap-4 items-center justify-center -ml-8 lg:ml-2">
                    <div className="hidden lg:flex lg:gap-4"><Newsletter /> |</div>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faPinterestP} /></Link>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faYoutube} /></Link>
                </div>
                <div className="lg:hidden flex items-center justify-center gap-4 lg:mr-4">
                    <MobileMenu />
                </div>
                <ul className="hidden lg:flex space-x-32 items-center justify-center">
                    <li>
                        <ShopMenu />
                    </li>
                    <li>
                        <Link href='/about' className="link-underline">about</Link>
                    </li>
                    <li>
                        <Link href='/' className=""><Image src={Logo} alt='logo' className="w-10 icon-scale"/></Link>
                    </li>
                    <li>
                        <Link href='/contact' className="link-underline">contact</Link>
                    </li>
                    <li>
                        <Link href='/faq' className="link-underline">faq</Link>
                    </li>
                </ul>
                <div className="lg:hidden">
                    <Link href='/'><Image src={Logo} alt='logo' className="w-14 icon-scale"/></Link>
                </div>
                <div className="flex items-center justify-center gap-4 lg:mr-4">
                    <select id='select' className="hidden lg:block bg-[#4C4B48] text-white px-2">
                        <option>eur</option>
                        <option>dol</option>
                        <option>pnd</option>
                    </select>
                    <LoginWindow />
                    <Link href='/cart' className="icon-scale relative">
                        <CartItemsCounter />
                        <FontAwesomeIcon icon={faShoppingBag} />
                    </Link>
                </div>
            </div>
        </nav>
    );
  }