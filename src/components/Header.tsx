import Link from "next/link";
import Image from 'next/image';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faEtsy, faTiktok, faPinterestP} from "@fortawesome/free-brands-svg-icons"
import { faUserAlt, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import ShopMenu from "./ShopMenu";


export default function Header() {
    return (
        <nav className="flex flex-col mt-12 lg:mt-0">
            <div className="flex justify-between lg:backdrop-blur-[4px] pt-4 pb-1 px-12">
                <div className="flex gap-3 items-center justify-center">
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faInstagram} /></Link>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faPinterestP} /></Link>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faEtsy} /></Link>
                </div>
                <ul className="hidden lg:flex space-x-24 items-center justify-center">
                    <li>
                        <ShopMenu />
                    </li>
                    <li>
                        <Link href='/about' className="link-underline">about</Link>
                    </li>
                    <li>
                        <Link href='/'><Image src={Logo} alt='logo' className="w-9 icon-scale"/></Link>
                    </li>
                    <li>
                        <Link href='/contact' className="link-underline">contact</Link>
                    </li>
                    <li>
                        <Link href='/faq' className="link-underline">faq</Link>
                    </li>
                </ul>
                <div className="lg:hidden">
                    <Link href='/'><Image src={Logo} alt='logo' className="w-12 icon-scale"/></Link>
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <select id='select' className="hidden bg-[#4C4B48] text-white px-1 lg:block">
                        <option>eur</option>
                        <option>dol</option>
                        <option>pnd</option>
                    </select>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faUserAlt} /></Link>
                    <Link href='' className="icon-scale"><FontAwesomeIcon icon={faShoppingBag} /></Link>
                </div>
            </div>
            <div className="hidden px-12 z-[99] lg:block">
                <hr />
            </div>
        </nav>
    );
  }