import { Request, Response } from 'express';
import assert from 'assert';

import * as postService from './post.service';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await postService.getPosts();
  res.json({ posts });
};

export const addPost = async (req: Request, res: Response): Promise<void> => {
  const { name, title, content } = req.body
  assert(req.user);
  if (!name || !title || !content) {
    res.status(400).send("Missing required fields");
    return;
  }
  const filePath = req.file?.path
  const fileOriginalName = req.file?.originalname

  const saved = await postService.addPost({ name, title, content, filePath, fileOriginalName }, String(req.user._id));
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
  const deleted = await postService.deletePost(req.params.cuid, String(req.user._id));
  if (deleted) {
    res.status(200).send({ message: `1 Post deleted` })
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }
};
