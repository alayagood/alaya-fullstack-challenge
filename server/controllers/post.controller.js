const Post = require('../models/post');
const Image = require('../models/image');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const { uploadImages } = require('../services/cloudinary');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }

    // handle delete permissions
    posts = posts.map(post => {
      let canBeDeleted = false;
      if (post.user == req.session.cuid) canBeDeleted = true;

      return { ...post.toJSON(), canBeDeleted };
    });

    res.json({ posts });
  });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
  if (!req.body.post || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  // try to upload images
  const { images } = req.body.post;
  let uploadedImages = [];
  try {
    uploadedImages = await uploadImages(images);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error creating post, try again." });
  }


  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.user = req.session.cuid;
  newPost.name = `${req.session.firstname} ${req.session.lastname}`;
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });

  try {
    //save post
    const saved = await newPost.save();

    //save images
    const savedImages = await Image.insertMany(uploadedImages.map(image => ({
      url: image.url,
      publicId: image.public_id,
      post: saved.cuid,
      user: req.session.cuid
    })));

    res.json({ post: { ...saved.toJSON(), images: savedImages, canBeDeleted: true } });
  } catch (err) {
    return res.status(500).send(err);
  }

};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec(async (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec(async (err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    // validate if it can be deleted by user
    if (!post || post.user != req.session.cuid) {
      return res.status(400).end();
    }

    /* 
      * this post and images should be deleted with logic deleted field dateDeleted=Date.now()
    */
    post.remove(async () => {
      //remove images
      await Image.deleteMany({ post: post.cuid });

      res.status(200).send({ cuid: req.params.cuid });
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
