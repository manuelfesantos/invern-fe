import { useState } from "react";
import useWindowSize from "@/hooks/use-window-size";
import {
  CartOption,
  DesktopMenu,
  LogoOption,
  MobileMenu,
} from "@/components/Header/HeaderOptions";
import MenuMobile from "@/components/Header/MenuMobile";
import { sizes } from "@/styles/sizes";
import styles from "./Header.module.css";

const desktopMenuStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  color: "white",
};
function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.headerStyle}>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <LogoOption />
        <CartOption />
      </div>
      <MenuMobile isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

function DesktopHeader() {
  const [shopIsOpen, setShopIsOpen] = useState(false);
  const [collectionsIsOpen, setCollectionsIsOpen] = useState(false);
  return (
    <>
      <div className={styles.headerStyle}>
        <LogoOption
          closeAll={() => {
            setShopIsOpen(false);
            setCollectionsIsOpen(false);
          }}
        />
      </div>
      <div style={desktopMenuStyle}>
        <DesktopMenu
          collectionsIsOpen={collectionsIsOpen}
          setCollectionsIsOpen={setCollectionsIsOpen}
          shopIsOpen={shopIsOpen}
          setShopIsOpen={setShopIsOpen}
        />
        <CartOption />
      </div>
    </>
  );
}

export default function Header() {
  const { width } = useWindowSize();

  return (
    <div style={{ width: "100vw" }}>
      {width > sizes.MOBILE_MAX_WIDTH ? <DesktopHeader /> : <MobileHeader />}
    </div>
  );
}
