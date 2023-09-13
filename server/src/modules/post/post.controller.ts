import { Request, Response } from 'express';

import * as postService from './post.service';


export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await postService.getPosts();
  res.json({ posts });
};

export const addPost = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
    return;
  }

  const saved = await postService.addPost(req.body.post);
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

  const { deletedCount } = await postService.deletePost(req.params.cuid);
  console.log(deletedCount, "SDSD");

  if (deletedCount) {
    res.status(200).send({ message: `${deletedCount} Post deleted` })
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }

};
