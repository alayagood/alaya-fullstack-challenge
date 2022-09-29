export const CLOUDINARY_CLOUD_NAME = 'diatxgrpq';
export const CLOUDINARY_UPLOAD_PRESET_NAME = 'rtaorbw4';

export const uploadImage = async (e, setMessage, setButtonDisabled) => {
  setButtonDisabled(true);
  setMessage('Uploading image...');

  let files = e.target.files;
  let data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET_NAME);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
    method: 'POST',
    body: data,
  });

  return await res.json();
};
