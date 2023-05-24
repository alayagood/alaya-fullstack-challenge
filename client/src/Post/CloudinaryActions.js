import callApi from '../util/cloudinary';


export function addCloudinaryImage(image) {

  var formData = new FormData();
  formData.append('file', image.file);
  formData.append('api_key', '679191491813572');
  formData.append('upload_preset', 'qsnzrgpk');
  formData.append('public_id', image.name);

  return (dispatch) => {
    return callApi('post', formData) 
    };

}; 


