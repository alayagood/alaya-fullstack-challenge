import { Request, Response } from 'express';
import assert from 'assert';
import CustomError from '../../utils/errors/CustomError';
import { addPostSchema } from './post.schema';
import IPostController from './interfaces/IPostController';
import IPostService from './interfaces/IPostService';



export default class PostController implements IPostController {
  constructor(private postService: IPostService) { }

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    const posts = await this.postService.getPosts();
    res.json({ posts });
  };

  public addPost = async (req: Request, res: Response): Promise<void> => {
    const { title, name, content } = addPostSchema.parse(req.body);
    assert(req.user);

    const filePath = req.file?.path;
    const fileOriginalName = req.file?.originalname;

    const saved = await this.postService.addPost(
      { name, title, content, filePath, fileOriginalName },
      req.user._id
    );
    res.status(201).json({ post: saved });
  };

  public getPost = async (req: Request, res: Response): Promise<void> => {
    const post = await this.postService.getPost(req.params.cuid);
    if (!post) {
      throw new CustomError('Post Not Found', 404);
    }
    res.json({ post });
  };

  public deletePost = async (req: Request, res: Response): Promise<void> => {
    assert(req.user);
    const deleted = await this.postService.deletePost(req.params.cuid, req.user._id);
    if (deleted) {
      res.status(200).send({ ok: true, message: `1 Post deleted` });
    } else {
      throw new CustomError('Post Not Found', 404);
    }
  };
}
