import Link from "next/link";
import Image from 'next/image';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faFacebook, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons"
import { faUserAlt, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import ShopMenu from "./ShopMenu";

export default function Header() {
    return (
        <nav className="flex flex-col">
            <div className="flex justify-between backdrop-blur-lg pt-4 pb-1 px-12">
                <div className="flex gap-3 items-center justify-center">
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
                <ul className="flex space-x-24 items-center justify-center">
                    <li>
                        <ShopMenu />
                        {/*<Link href='/shop'>shop</Link>*/}
                    </li>
                    <li>
                        <Link href='/about' className="link-underline">about</Link>
                    </li>
                    <li>
                        <Link href='/'><Image src={Logo} alt='logo' className="w-9 transition-transform duration-500 hover:scale-150"/></Link>
                    </li>
                    <li>
                        <Link href='/contact' className="link-underline">contact</Link>
                    </li>
                    <li>
                        <Link href='/faq' className="link-underline">faq</Link>
                    </li>
                </ul>
                <div className="flex gap-3 items-center justify-center">
                    <select id='select' className="bg-[#4C4B48] text-white px-1">
                        <option>eur</option>
                        <option>dol</option>
                        <option>pnd</option>
                    </select>
                    <FontAwesomeIcon icon={faUserAlt} />
                    <FontAwesomeIcon icon={faShoppingBag} />
                </div>
            </div>
            <div className="px-12 z-[99]">
                <hr />
            </div>
        </nav>
    );
  }