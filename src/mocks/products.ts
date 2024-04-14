import { IProduct } from "@/types/store/product";
import { getR2Image } from "@/utils/r2";

export const productsMock: IProduct[] = [
  {
    id: 1,
    name: "Earth Jar",
    description: "Earth jar 20 'riven', unglazed stoneware",
    price: 100,
    images: [
      getR2Image("products/ceramics-product-1-1.jpeg"),
      getR2Image("products/ceramics-product-1-2.jpeg"),
      getR2Image("products/ceramics-product-1-3.jpeg"),
      getR2Image("products/ceramics-product-1-4.jpeg"),
    ],
    quantity: 1,
  },
  {
    id: 2,
    name: "Raku Fire",
    description: "'watershed' hand formed, raku fired ceramic",
    price: 200,
    images: [
      getR2Image("products/ceramics-product-2-1.jpeg"),
      getR2Image("products/ceramics-product-2-2.jpeg"),
      getR2Image("products/ceramics-product-2-3.jpeg"),
      getR2Image("products/ceramics-product-2-4.jpeg"),
    ],
    quantity: 1,
  },
  {
    id: 3,
    name: "Saggar Bottles",
    description: "3 Erosion bottles Saggar fired stoneware",
    price: 300,
    images: [
      getR2Image("products/ceramics-product-3-1.jpeg"),
      getR2Image("products/ceramics-product-3-2.jpeg"),
      getR2Image("products/ceramics-product-3-3.jpeg"),
      getR2Image("products/ceramics-product-3-4.jpeg"),
    ],
    quantity: 1,
  },
];
