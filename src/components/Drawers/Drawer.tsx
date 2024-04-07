import { ReactNode } from "react";
import { Box, useTheme } from "@mui/system";
import useHeaderHeight from "@/hooks/use-header-height";
import { headerDrawerAnimation } from "@/styles/animations/header-drawer-animation";
import { black } from "next/dist/lib/picocolors";

interface Props {
  children: ReactNode | ReactNode[];
  onMouseLeave: () => void;
}

export default function Drawer({ children, onMouseLeave }: Props) {
  const { headerHeight } = useHeaderHeight();
  const theme = useTheme();
  return (
    <Box
      onMouseLeave={onMouseLeave}
      sx={{
        width: "100vw",
        height: `calc(100vh - ${headerHeight}px)`,
        backgroundColor: "rgba(33,33,33,0.53)",
        position: "absolute",
        left: 0,
        top: -headerHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "1rem",
        padding: "1rem",
        transform: "scaleY(0%)",
        animation: "fadeIn 0.5s forwards ease-in-out",
        "@keyframes fadeIn": headerDrawerAnimation(headerHeight),
      }}
    >
      {children}
    </Box>
  );
}
