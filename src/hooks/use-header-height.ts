import { useLayoutEffect, useState } from "react";
import useWindowSize from "@/hooks/use-window-size";
import { sizes } from "@/styles/sizes";

export default function useHeaderHeight() {
  const { width } = useWindowSize();
  const [headerHeight, setHeaderHeight] = useState(0);
  useLayoutEffect(() => {
    if (width > sizes.MOBILE_MAX_WIDTH) {
      setHeaderHeight(sizes.DESKTOP_HEADER_HEIGHT);
    } else {
      setHeaderHeight(sizes.MOBILE_HEADER_HEIGHT);
    }
  }, [width, headerHeight]);
  return { headerHeight };
}
