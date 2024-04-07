export const headerDrawerAnimation = (headerHeight: number) => ({
  from: {
    top: headerHeight * -2.75,
    transform: "scaleY(0%)",
  },
  to: {
    top: headerHeight,
    transform: "scaleY(100%)",
  },
});
