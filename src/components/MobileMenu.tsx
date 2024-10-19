"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import MenuAnimation from "./MenuAnimation";
import ItemAnimation from "./ItemAnimation";

const MobileMenu = () => {
  const [menu, setMenu] = useState(false);
  const [collections, setCollections] = useState(false);

  const style =
    "absolute top-0 left-0 origin-left flex flex-col items-center justify-center h-[100dvh] w-screen bg-[#4C4B48] z-100";

  const handleMenu = () => {
    setMenu(!menu);
    setCollections(false);
  };

  const handleCollectionsMenu = () => {
    setCollections(!collections);
  };

  const stagger = {
    initial: {
      transition: {
        staggerChildren: 0.025,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  return (
    <nav className="lg:hidden mobile-menu z-20">
      {!menu && (
        <div className="cursor-pointer icon-scale">
          <div onClick={handleMenu} onDrag={handleMenu}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
        </div>
      )}
      <AnimatePresence>
        {menu && (
          <MenuAnimation scale={"scaleX"} style={style}>
            <motion.div
              variants={stagger}
              initial="initial"
              animate="open"
              exit="initial"
            >
              <div>
                <ul>
                  <li>
                    {!collections ? (
                      <ItemAnimation>
                        <Link
                          href=""
                          onClick={handleCollectionsMenu}
                          className="mobile-menu"
                        >
                          Shop{" "}
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-xl"
                          />
                        </Link>
                      </ItemAnimation>
                    ) : (
                      <>
                        <ItemAnimation>
                          <Link
                            href=""
                            onClick={handleCollectionsMenu}
                            className="mobile-menu"
                          >
                            Shop{" "}
                            <FontAwesomeIcon
                              icon={faChevronUp}
                              className="text-xl"
                            />
                          </Link>
                        </ItemAnimation>
                        <ItemAnimation>
                          <div className="flex flex-col ml-6 my-2 text-xl">
                            <Link
                              href="/shop/collections"
                              onClick={handleMenu}
                              className="mobile-menu"
                            >
                              By Collection
                            </Link>
                            <Link
                              href="/shop/products"
                              onClick={handleMenu}
                              className="mobile-menu"
                            >
                              By Product
                            </Link>
                          </div>
                        </ItemAnimation>
                      </>
                    )}
                  </li>
                  <li>
                    <ItemAnimation>
                      <Link
                        href="/about"
                        onClick={handleMenu}
                        className="mobile-menu"
                      >
                        About
                      </Link>
                    </ItemAnimation>
                  </li>
                  <li>
                    <ItemAnimation>
                      <Link
                        href="/contact"
                        onClick={handleMenu}
                        className="mobile-menu"
                      >
                        Contact
                      </Link>
                    </ItemAnimation>
                  </li>
                  <li>
                    <ItemAnimation>
                      <Link
                        href="/faq"
                        onClick={handleMenu}
                        className="mobile-menu"
                      >
                        Faq
                      </Link>
                    </ItemAnimation>
                  </li>
                </ul>
              </div>
              <div className="absolute top-0 left-0 bg-[#444340] flex items-center justify-center h-full w-[8%]">
                <div onClick={handleMenu} className="cursor-pointer icon-scale">
                  <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </div>
              </div>
            </motion.div>
          </MenuAnimation>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileMenu;
