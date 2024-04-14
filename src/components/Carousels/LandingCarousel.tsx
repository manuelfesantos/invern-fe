import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useWindowSize from "@/hooks/use-window-size";
import { sizes } from "@/styles/sizes";
import { getR2Image } from "@/utils/r2";

export default function LandingCarousel() {
  const { width } = useWindowSize();

  const [images] = useState([
    getR2Image("ceramics-background-1.jpeg"),
    getR2Image("ceramics-background-2.jpeg"),
    getR2Image("ceramics-background-3.jpeg"),
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  const [leftImage, setLeftImage] = useState(images.length - 1);
  const [rightImage, setRightImage] = useState(1);

  const moveImage = useCallback(
    (imageIndex: number, direction: "left" | "right") => {
      if (direction === "left") {
        return imageIndex === 0 ? images.length - 1 : imageIndex - 1;
      }
      return imageIndex === images.length - 1 ? 0 : imageIndex + 1;
    },
    [images.length],
  );

  const moveImages = useCallback(
    (direction: "left" | "right") => {
      setCurrentImage((prevState) => moveImage(prevState, direction));
      setLeftImage((prevState) => moveImage(prevState, direction));
      setRightImage((prevState) => moveImage(prevState, direction));
    },
    [moveImage],
  );

  const resolveOpacity = (index: number) => {
    if (index === currentImage) return 1;
    if (index === leftImage) return 1;
    if (index === rightImage) return 0;
    return 0;
  };

  const resolveTransform = (index: number) => {
    if (index === currentImage) return 0;
    if (index === leftImage) return -100;
    if (index === rightImage) return 100;
    return -100;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveImages("right");
    }, 5000);
    return () => clearInterval(interval);
  }, [moveImages]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {images.map((image, index) => (
            <div
              key={image}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: resolveOpacity(index),
                transform: `translateX(${resolveTransform(index)}%)`,
                transition: "transform 0.8s ease-in-out",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={image}
                  alt={"ceramics"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: `calc(100vh - ${width > sizes.MOBILE_MAX_WIDTH ? `${sizes.DESKTOP_HEADER_HEIGHT}px` : `${sizes.MOBILE_HEADER_HEIGHT}px`})`,
        }}
      ></div>
    </>
  );
}
