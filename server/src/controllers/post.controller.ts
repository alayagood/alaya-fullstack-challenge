import { Request, Response } from 'express';
import Post, { IPost } from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort('-dateAdded');
    res.json({ posts });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addPost = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
    return;
  }

  const newPost: IPost = new Post(req.body.post);
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase());
  newPost.cuid = cuid();

  try {
    const saved = await newPost.save();
    res.json({ post: saved });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ cuid: req.params.cuid });
    res.json({ post });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ cuid: req.params.cuid });
    if (post) {
      await post.deleteOne();
      res.status(200).end();
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
