import { Request, Response } from 'express';

import * as postService from './post.service';


export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postService.getPosts();
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
  try {
    const saved = await postService.addPost(req.body.post);
    res.status(201).json({ post: saved });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await postService.getPost(req.params.cuid)
    if (!post) {
      res.status(404).send({ detail: 'Post Not Found' });
      return
    }
    res.json({ post });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { deletedCount } = await postService.deletePost(req.params.cuid);
    if (deletedCount) {
      res.status(200).send({ detail: `${deletedCount} Post deleted` })
    } else {
      res.status(404).send({ detail: 'Post Not Found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
