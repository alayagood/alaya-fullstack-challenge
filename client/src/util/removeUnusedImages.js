const imageRegex = (imageName) =>
  new RegExp(`[\\!]?\\[${imageName}\\]\\([\\S\\s]*\\)`, "g");

/**
 * @param {string} content
 * @param {{ url: string, name: string }} newImage
 * @return {string}
 */
const replaceImageWithNewURL = (content, newImage) => {
  let contentWithReplacedImage = content;
  const regex = imageRegex(newImage.name);
  contentWithReplacedImage = contentWithReplacedImage.replace(
    regex,
    `![${newImage.name}](${newImage.url})`
  );
  console.log({ contentWithReplacedImage });
  return contentWithReplacedImage;
};

/**
 *
 * @param {string} content
 * @param {{url: string, name: string}[]} newImages
 * @return {string}
 */
export const replaceImagesInContent = (content, newImages) =>
  newImages.reduce(
    (newContent, newImage) => replaceImageWithNewURL(newContent, newImage),
    content
  );

/**
 * @param {string} content
 * @param {string[]} excludedImages
 * @return {string} Images that we will upload
 */
const removeImagesFromContent = (content, excludedImages) => {
  let contentWithoutUnusedImages = content;
  excludedImages.forEach((excludedImage) => {
    const regex = imageRegex(excludedImage);
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

  const newContent = removeImagesFromContent(content, imagesExcluded);

  return {
    content: newContent,
    images: imagesIncluded,
  };
};

export default transformPostRequest;
