import { productsMock } from "@/mocks/products";

export const collectionsMock = [
  {
    id: 1,
    name: "Erosion",
    description:
      "The nature of clay will speak of the continual erosion and weathering of the land we live on, of the traces made by the passage of humans across the surface of our planet and of the tension between a container and its contents.",
    products: [productsMock[0],productsMock[1],productsMock[2]],
  },
  {
    id: 2,
    name: "Midden",
    description:
      "Skye’s landscape undergoes fundamental natural changes as a result of climatic and geological processes. Changes made by human activities such as settlement and agriculture are scratched on its surface.",
    products: [productsMock[3],productsMock[4],productsMock[5]],
  },
  {
    id: 3,
    name: "Contour",
    description:
      "My Contour collection grows from a feeling of connection to the land and the effect of people upon its surface. The forms of the land are bounded by fencing and dykes, crossed by paths and water courses, which can delineate, separate and unify.",
    products: [productsMock[6],productsMock[7],productsMock[8]],
  },
];