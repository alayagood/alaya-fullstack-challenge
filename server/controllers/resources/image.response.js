exports.response = function (cloudinaryResponse) {
  const response = {};
  response.publicId = cloudinaryResponse.public_id;
  response.url = cloudinaryResponse.secure_url;
  response.assetId = cloudinaryResponse.asset_id;

  return response;
}