import React from "react";
import {Button} from "@material-ui/core";
import "./ImageList.css";

function ImageList({images, selectedImgs, toggleSelectImg, closeModal}) {
  const isImgSelected = (img) => selectedImgs.includes(img);

  return (
    <div>
      <div className="imagesListHeader">
        Select images to add to the post:
        <span>{selectedImgs.length} added</span>
      </div>
      <div className="d-flex flex-wrap justify-content-center wrapper">
        {images.map(({path}) => (
          <div
            key={path}
            className={`image cursorPointer d-flex align-items-center m-2 p-2 border  ${
              isImgSelected(path) ? "border-success" : "border-light"
            }`}
            onClick={() => toggleSelectImg(path)}
          >
            {/* eslint-disable-next-line */}
            <img src={path} width="100%" />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center m-2">
        <Button onClick={closeModal} variant="contained" color="default">
          Done
        </Button>
      </div>
    </div>
  );
}

export default ImageList;
