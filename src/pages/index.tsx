import LandingCarousel from "@/components/Carousels/LandingCarousel";
import useHeaderHeight from "@/hooks/use-header-height";

export const runtime = "experimental-edge";

export default function Home() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <LandingCarousel />
    </>
  );
}
