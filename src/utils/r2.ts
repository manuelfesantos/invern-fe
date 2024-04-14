const r2ImagesWorkerUrl = "https://blue-heart-93dc.manuelfesantos.workers.dev/";
export const getR2Image = (image: string) => {
  return `${r2ImagesWorkerUrl}${image}`;
};

export const getR2ImageFromFolder = (folder: string, image: string) => {
  return `${r2ImagesWorkerUrl}${folder}/${image}`;
};
