import { Request, Response } from 'express';
import assert from 'assert';

import * as postService from './post.service';
import sanitizeHtml from 'sanitize-html';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await postService.getPosts();
  res.json({ posts });
};

export const addPost = async (req: Request, res: Response): Promise<void> => {
  const { post } = req.body
  if (!post?.name || !post?.title || !post?.content) {
    res.status(403).end();
    return;
  }
  post.title = sanitizeHtml(post.title);
  post.name = sanitizeHtml(post.name);
  post.content = sanitizeHtml(post.content);
  assert(req.user);


  const saved = await postService.addPost(post, String(req.user._id));
  res.status(201).json({ post: saved });
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  const post = await postService.getPost(req.params.cuid)
  if (!post) {
    res.status(404).send({ message: 'Post Not Found' });
    return
  }
  res.json({ post });
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  assert(req.user);
  const { deletedCount } = await postService.deletePost(req.params.cuid, String(req.user._id));
  if (deletedCount) {
    res.status(200).send({ message: `${deletedCount} Post deleted` })
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }
};
