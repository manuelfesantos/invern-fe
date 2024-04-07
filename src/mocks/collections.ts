import { productsMock } from "@/mocks/products";

export const collectionsMock = [
  {
    id: 1,
    name: "Erosion",
    description:
      "The nature of clay will speak of the continual erosion and weathering of the land we live on, of the traces made by the passage of humans across the surface of our planet and of the tension between a container and its contents.",
    products: [productsMock[0]],
  },
  {
    id: 2,
    name: "Contour",
    description:
      "My Contour collection grows from a feeling of connection to the land and the effect of people upon its surface. The forms of the land are bounded by fencing and dykes, crossed by paths and water courses, which can delineate, separate and unify.",
    products: [productsMock[1]],
  },
  {
    id: 3,
    name: "Midden",
    description:
      "These broken containers, upturned, partially hidden and weathered by the elements hold the secrets and the memories of the people who discarded them – here is the link to previous inhabitants – our continuing human need for containers.",
    products: [productsMock[2]],
  },
];
