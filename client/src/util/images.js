export const parseImageToBase64 = async (image) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        }
        reader.readAsDataURL(image);
    });
}