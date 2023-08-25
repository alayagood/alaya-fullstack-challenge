const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const mongoConnectString = process.env.MONGO_CONNECT_STRING

async function populatePostsWithImages(posts, bucket) {
  const postsWithImages = [];

  for (const post of posts) {
    const postWithImage = { ...post.toObject() };

    if (post.imageId) {
      try {
        const imageStream = bucket.openDownloadStream(new ObjectId(post.imageId));
        const chunks = await new Promise((resolve, reject) => {
          const chunks = [];
          imageStream.on('data', chunk => chunks.push(chunk));
          imageStream.on('end', () => resolve(chunks));
          imageStream.on('error', error => reject(error));
        });

        const imageBuffer = Buffer.concat(chunks);
        postWithImage.image = imageBuffer.toString('base64');
      } catch (error) {
        console.error('Error reading image stream:', error);
      }
    }
    postsWithImages.push(postWithImage);
  }
  return postsWithImages;
}

getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-dateAdded').exec();
    const mongoClient = await MongoClient.connect(mongoConnectString, { useNewUrlParser: true });
    const db = mongoClient.db('alaya-mongo');
    const bucketName = 'photos';
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName });

    const postsWithImages = await populatePostsWithImages(posts, bucket);

    await mongoClient.close();
    res.json({ posts: postsWithImages });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Save a post
 * @param req
 * @param res
 * @param imageId
 * @returns void
 */
addPost = async (req, res, imageId = undefined) => {
  if (!req.body.name || !req.body.title || !req.body.content) {
    res.status(403).end();
  }
  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  // use actual user email as owner, not request.body email
  newPost.owner = req.user.email;
  newPost.imageId = imageId;

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  await newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({post: saved});
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
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
const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ cuid: req.params.cuid });

    if (!post) {
      return res.status(404).send('Post not foundd');
    }

    if (req.user.email !== post.owner) {
      return res.status(401).send('Unauthorized');
    }

    await post.remove();
    res.json(200).end();
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
