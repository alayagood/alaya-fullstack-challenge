/**
 * @param {string} content
 * @param {string[]} excludedImages
 * @return {string} Images that we will upload
 */
const removeImagesFromContent = (content, excludedImages) => {
  let contentWithoutUnusedImages = content;
  excludedImages.forEach((excludedImage) => {
    const regex = new RegExp(`\\!\\[${excludedImage}\\]\\([\\S\\s]*\\)`, "g");
    // TODO: create regex to remove image
    contentWithoutUnusedImages = contentWithoutUnusedImages.replace(regex, "");
  });
  return contentWithoutUnusedImages;
};

/**
 * Remove imagesToUpload because they are not being used in the post's content
 * @param {string} content
 * @param {{ file: File, image: string }[]} images
 * @return {{ imagesIncluded: File[], imagesExcluded: File[] }} Image files that we will upload
 */
const getUploadableImages = (content, images) => {
  let imagesExcluded = [];

  const imagesIncluded = images.reduce((acc, { image, file }) => {
    const hasImageInContent = content.includes(image);
    console.log({ image, file });
    if (hasImageInContent) {
      return [...acc, file];
    } else {
      imagesExcluded.push(image);
      return acc;
    }
  }, []);

  return { imagesIncluded, imagesExcluded };
};

/**
 *
 * @param {string} content
 * @param {{ file: File, image: string}[]} images
 * @returns {{ content: string, images: File[] }}
 */
export const transformPostRequest = (content, images) => {
  const { imagesIncluded, imagesExcluded } = getUploadableImages(
    content,
    images
  );

  console.log({ content, images });

  const newContent = removeImagesFromContent(content, imagesExcluded);

  return {
    content: newContent,
    images: imagesIncluded,
  };
};

export default transformPostRequest;
