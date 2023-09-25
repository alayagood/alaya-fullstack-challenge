import { Request, Response } from 'express';

interface IPostController {
  getPosts(req: Request, res: Response): Promise<void>;
  addPost(req: Request, res: Response): Promise<void>;
  getPost(req: Request, res: Response): Promise<void>;
  deletePost(req: Request, res: Response): Promise<void>;
}

export default IPostController;
