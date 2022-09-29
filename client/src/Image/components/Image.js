import React from 'react';

const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

export const Image = ({ className, photoUrl = noImage, alt }) => {
  if (photoUrl === 'undefined' || !photoUrl) {
    photoUrl = noImage;
  }
  return <img className={className} src={photoUrl} alt={alt} loading={'lazy'} />;
};
