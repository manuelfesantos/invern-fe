import { Dispatch, SetStateAction, useContext } from "react";
import { CartContext, cartContext } from "@/context/cart";
import ShopDrawer from "@/components/Drawers/ShopDrawer";
import CollectionsDrawer from "@/components/Drawers/CollectionsDrawer";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <>
      <div
        style={{ textAlign: "left", cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        MENU
      </div>
    </>
  );
}

export function DesktopMenu({
  collectionsIsOpen,
  setCollectionsIsOpen,
  shopIsOpen,
  setShopIsOpen,
}: {
  collectionsIsOpen: boolean;
  setCollectionsIsOpen: Dispatch<SetStateAction<boolean>>;
  shopIsOpen: boolean;
  setShopIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <p
          style={{ cursor: "default" }}
          onMouseEnter={() => {
            setShopIsOpen(true);
            setCollectionsIsOpen(false);
          }}
          onClick={() => {
            setCollectionsIsOpen(false);
            setShopIsOpen((prevState) => !prevState);
          }}
        >
          SHOP
        </p>
        <p
          style={{ cursor: "default" }}
          onMouseEnter={() => {
            setShopIsOpen(false);
            setCollectionsIsOpen(true);
          }}
          onClick={() => {
            setShopIsOpen(false);
            setCollectionsIsOpen((prevState) => !prevState);
          }}
        >
          COLLECTIONS
        </p>
        <Link href={"/about"}>ABOUT</Link>
      </div>
      {shopIsOpen && <ShopDrawer setIsOpen={setShopIsOpen} />}
      {collectionsIsOpen && (
        <CollectionsDrawer setIsOpen={setCollectionsIsOpen} />
      )}
    </>
  );
}

export function CartOption() {
  const { cart } = useContext(cartContext) as CartContext;
  return (
    <Link href={"/cart"} style={{ textAlign: "right", cursor: "pointer" }}>
      CART({cart.totalQuantity})
    </Link>
  );
}

export function LogoOption({ closeAll }: { closeAll?: () => void }) {
  return (
    <Link onClick={closeAll} href={"/"}>
      INVERN
    </Link>
  );
}
