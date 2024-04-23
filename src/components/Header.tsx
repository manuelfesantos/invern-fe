import Link from "next/link";
import Image from 'next/image';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faFacebook, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons"
import { faUserAlt, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <nav className="flex flex-col py-4 px-[15%]">
            <ul className="flex space-x-24 items-center justify-center">
                <li>
                    <Link href='/shop'>shop</Link>
                </li>
                <li>
                    <Link href='/about'>about</Link>
                </li>
                <li>
                    <Link href='/'><Image src={Logo} alt='logo' className="w-9"/></Link>
                </li>
                <li>
                    <Link href='/contact'>contact</Link>
                </li>
                <li>
                    <Link href='/faq'>faq</Link>
                </li>
            </ul>
            <div className="flex flex-col">
                <hr />
                <div className="flex justify-between">
                    <div className="flex gap-3 mt-3">
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <div className="flex gap-3 mt-3">
                        <select id='select' className="bg-[#4C4B48] text-white px-1">
                            <option>eur</option>
                            <option>dol</option>
                            <option>pnd</option>
                        </select>
                        <FontAwesomeIcon icon={faUserAlt} />
                        <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                </div>
            </div>
        </nav>
    );
  }