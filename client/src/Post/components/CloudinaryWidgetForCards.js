import React from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {fill} from "@cloudinary/url-gen/actions/resize";

export function CloudinaryWidgetForCards(image) {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dfzaezp5e',
      api_key: '679191491813572', 
    }
  });

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('docs/' + image.image); 
    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(fill().width(525).height(250)).roundCorners(byRadius(20));
    

  return ( image.image ?
        <AdvancedImage cldImg={myImage}/>
    :
        <div/>
  );
}
export default CloudinaryWidgetForCards;