import {useState} from "react";

const useSelectedImages = () => {
  const [selectedImgs, setSelectedImgs] = useState([]);

  const addSelectedImg = (img) => {
    setSelectedImgs([...selectedImgs, img]);
  };
  const toggleSelectImg = (img) => {
    const pos = selectedImgs.indexOf(img);
    if (pos === -1) {
      addSelectedImg(img);
    } else {
      setSelectedImgs([
        ...selectedImgs.slice(0, pos),
        ...selectedImgs.slice(pos + 1),
      ]);
    }
  };

  return [selectedImgs, addSelectedImg, toggleSelectImg];
};

export default useSelectedImages;
