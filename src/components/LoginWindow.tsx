"use client";
import React, { Context, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import MenuAnimation from "./MenuAnimation";
import ItemAnimation from "./ItemAnimation";
import { CustomButton, CustomLink } from "./CustomComponents";
import { UserContext, userContext } from "@/context/user";
import { syncUser } from "@/utils/syncUser";
import { syncCart } from "@/utils/syncCart";
import { cartContext, CartContext } from "@/context/cart";

export default function LoginWindow() {
  const [menu, setMenu] = useState(false);
  const { user, setUser } = useContext<UserContext | null>(
    userContext,
  ) as UserContext;
  const { setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );

  const logout = () => {
    setUser(null);
    syncUser(null);
    const emptyCart = {
      id: "0",
      items: [],
    };
    setCart(emptyCart);
    syncCart(emptyCart);
  };

  const style =
    "absolute top-16 right-12 mt-[3px] bg-[#4C4B48] bg-opacity-95 p-8 origin-top card-shadow";

  const toggleMenu = () => {
    setMenu(!menu);
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
    <>
      <div onClick={toggleMenu}>
        <Link href="" className="icon-scale">
          <FontAwesomeIcon icon={faUserAlt} />
        </Link>
      </div>
      {user === null ? (
        <AnimatePresence>
          {menu && (
            <MenuAnimation scale={"scaleY"} style={style}>
              <motion.div
                variants={stagger}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col justify-center gap-4"
              >
                <ItemAnimation>
                  <CustomLink href="/login">Sign in</CustomLink>
                </ItemAnimation>
                <ItemAnimation>
                  <CustomLink href="/login?signup=true">Sign up</CustomLink>
                </ItemAnimation>
              </motion.div>
            </MenuAnimation>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {menu && (
            <MenuAnimation scale={"scaleY"} style={style}>
              <motion.div
                variants={stagger}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col justify-center gap-4"
              >
                <ItemAnimation>
                  <h5>{user.email}</h5>
                  <CustomLink href="#" onClick={logout}>
                    Sign out
                  </CustomLink>
                </ItemAnimation>
              </motion.div>
            </MenuAnimation>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
