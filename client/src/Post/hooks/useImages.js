import {useState, useEffect} from "react";
import callApi from "../../util/apiCaller";

const useImages = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    callApi("images", "get").then(({images}) => {
      setImages(images);
    });
  }, []);
  return [images, setImages];
};

export default useImages;
