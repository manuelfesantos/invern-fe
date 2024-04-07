import LandingCarousel from "@/components/Carousels/LandingCarousel";
import useHeaderHeight from "@/hooks/use-header-height";

export default function Home() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <LandingCarousel />
    </>
  );
}
