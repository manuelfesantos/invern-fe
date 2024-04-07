import Link from "next/link";
import { Box, Theme, useTheme } from "@mui/system";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuSideBar = ({
  children,
  theme,
  isOpen,
}: {
  children: ReactNode | ReactNode[];
  theme: Theme;
  isOpen: boolean;
}) => (
  <Box
    sx={{
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
      backgroundColor: theme.palette.primary.main,
      opacity: isOpen ? 0.9 : 0,
      padding: "1rem",
    }}
  >
    {children}
  </Box>
);
export default function MenuMobile({ isOpen, setIsOpen }: Props) {
  const theme = useTheme();
  return (
    <MenuSideBar isOpen={isOpen} theme={theme}>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        X
      </Box>
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
