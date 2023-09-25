import PostService from '../PostService';

import CustomError from '../../../utils/errors/CustomError';
import { cloudinary } from '../../../middlewares/multerCloudinary';


// Mock Cloudinary
jest.mock('../../../middlewares/multerCloudinary', () => ({
  cloudinary: {
    uploader: {
      destroy: jest.fn(),
    },
  },
}));
// Mock ICrudService
const mockCrudService = {
  findMany: jest.fn(),
  createOne: jest.fn(),
  findOne: jest.fn(),
  deleteOne: jest.fn(),
};
describe('PostService', () => {

  let postService: PostService;

  beforeEach(() => {
    postService = new PostService(mockCrudService as any);
  });


  describe('getPosts', () => {
    it('should return posts', async () => {
      const mockPosts: any[] = [
        { name: "name", content: "content", title: "tittle", slug: "slug", cuid: "cuid", }
      ];
      mockCrudService.findMany.mockResolvedValue(mockPosts);
      const result = await postService.getPosts();
      expect(result).toEqual(mockPosts);
    });
  });

  describe('addPost', () => {
    it('should add a post', async () => {
      const mockPostData = { title: 'title', name: 'name', content: 'content', fileOriginalName: 'originalName', filePath: 'filePath' };
      const userId = 'someUserId';
      const mockCreatedPost = { name: "name", content: "content" };

      mockCrudService.createOne.mockResolvedValue(mockCreatedPost);

      const result = await postService.addPost(mockPostData, userId);
      expect(result).toEqual(mockCreatedPost);
    });
  });

  describe('getPost', () => {
    it('should return a post', async () => {
      const cuid = 'someCuid';
      const mockPost = { name: "name", content: "content" };

      mockCrudService.findOne.mockResolvedValue(mockPost);

      const result = await postService.getPost(cuid);
      expect(result).toEqual(mockPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const cuid = 'someCuid';
      const userId = 'someUserId';
      const mockPost = { user_id: userId, fileOriginalName: 'originalName' };

      mockCrudService.findOne.mockResolvedValue(mockPost);
      mockCrudService.deleteOne.mockResolvedValue(mockPost);

      const result = await postService.deletePost(cuid, userId);
      expect(result).toEqual(mockPost);
      expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('originalName');
    });

    it('should throw an error if user tries to delete another user\'s post', async () => {
      const cuid = 'someCuid';
      const userId = 'someUserId';
      const otherUserId = 'otherUserId';
      const mockPost = { user_id: otherUserId };

      mockCrudService.findOne.mockResolvedValue(mockPost);

      await expect(postService.deletePost(cuid, userId)).rejects.toThrow(new CustomError('User cant delete other user posts', 403));
    });
  });
});
