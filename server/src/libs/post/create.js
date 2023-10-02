const slug = require('limax');
const cuid = require('cuid');
const Post = require('../../models/post');

async function createNewPost(postPayload, owner) {
  const newPost = new Post(postPayload);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.owner = owner;

  await newPost.save();
  return newPost;

}

module.exports = {
  createNewPost,
};
