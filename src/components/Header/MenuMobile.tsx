import Link from "next/link";
import { ReactNode } from "react";
import { palette } from "@/styles/pallete";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuSideBar = ({
  children,
  isOpen,
}: {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      height: "100vh",
      width: "100vw",
      transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in",
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      backgroundColor: palette.primary.main,
      opacity: isOpen ? 0.9 : 0,
      padding: "1rem",
    }}
  >
    {children}
  </div>
);
export default function MenuMobile({ isOpen, setIsOpen }: Props) {
  return (
    <MenuSideBar isOpen={isOpen}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        X
      </div>
      <Link onClick={() => setIsOpen(!isOpen)} href="/shop">
        SHOP
      </Link>
      <Link onClick={() => setIsOpen(!isOpen)} href={"/collections"}>
        COLLECTIONS
      </Link>
      <Link onClick={() => setIsOpen(!isOpen)} href={"/about"}>
        ABOUT
      </Link>
    </MenuSideBar>
  );
}
