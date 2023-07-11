const Post = require('../models/Post');
const cloudinary = require('../util/cloudinary');
const {deletePost} = require("./post.controller");
const DB_ERROR = new Error('db error sample');
const CUID = 'testCuid';
const IMAGE_1 = 'eefptkc5daryqy0fy0iq';
const IMAGE_2 = 'rmop89xrpijrx3xqghhx';

jest.mock('../models/Post');
jest.mock('../util/cloudinary')


describe('Delete post', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                cuid: CUID,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should handle server error and return a 500 http status', async () => {
        Post.findOne = jest.fn().mockRejectedValue(DB_ERROR);

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(DB_ERROR);
    });

    it('should delete a post and return a 200 status', async () => {
        const mockPost = {
            images: [IMAGE_1, IMAGE_2],
            remove: jest.fn().mockImplementation(callback => {
                callback();
            }),
        };

        Post.findOne = jest.fn().mockReturnValue(mockPost);

        const deleteImageOnCloudMock = jest.fn();

        cloudinary.removeImages = jest.fn().mockImplementation((image) => {
            deleteImageOnCloudMock(image);
        });

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });

        expect(deleteImageOnCloudMock).toHaveBeenCalled();
        expect(deleteImageOnCloudMock).toHaveBeenCalledWith([IMAGE_1, IMAGE_2]);

        expect(mockPost.remove).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });
});
