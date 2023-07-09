const Post = require('../models/Post');
const {getPosts} = require("./post.controller");
const token = require('../util/token');
const slug = require('limax');
const cuid = require('cuid');
const User = require("../models/user");

const POST = {
    name: 'test post author',
    title: 'test post title',
    content: 'test post content',
    slug: 'test-post-title',
    cuid: 'testCuid'
};

const CUID = POST.cuid;
const DB_ERROR = new Error('database error')
const TOKEN = 'testToken';
const LOGGED_USER = POST.name;
const POST_AUTHOR = 'testPostAuthor';

jest.mock('../models/Post');
jest.mock('../util/token');
jest.mock('limax');
jest.mock('cuid');

describe('Get posts', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle server error and return 500', async () => {
        const findMock = jest.fn().mockReturnThis();
        const sortMock = jest.fn().mockReturnThis();
        const execMock = jest.fn().mockImplementation(callback => {
            callback(DB_ERROR);
        });

        Post.find = findMock;
        findMock.mockReturnValue({ sort: sortMock });
        sortMock.mockReturnValue({ exec: execMock });

        await getPosts(req, res);

        expect(Post.find).toHaveBeenCalled();
        expect(sortMock).toHaveBeenCalledWith('-dateAdded');
        expect(execMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(DB_ERROR);
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should successfully retrieve posts', async () => {
        const findMock = jest.fn().mockReturnThis();
        const sortMock = jest.fn().mockReturnThis();
        const execMock = jest.fn().mockImplementation(callback => {
            callback(null, [POST]);
        });

        Post.find = findMock;
        findMock.mockReturnValue({ sort: sortMock });
        sortMock.mockReturnValue({ exec: execMock });

        await getPosts(req, res);

        expect(Post.find).toHaveBeenCalled();
        expect(sortMock).toHaveBeenCalledWith('-dateAdded');
        expect(execMock).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ posts: [POST] });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});

describe('Add post', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                post: {
                    title: POST.title,
                    content: POST.content
                },
            },
            user: {
                username: POST.name,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond error 403 for empty title and/or content', async () => {
        req.body.post.title = '';
        req.body.post.content = '';

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should handle server error and return 500', async () => {
        slug.mockReturnValue(POST.slug);
        cuid.mockReturnValue(POST.cuid);
        Post.create = jest.fn().mockRejectedValue(DB_ERROR);

        await addPost(req, res);

        expect(Post.create).toHaveBeenCalledWith(POST);
        expect(slug).toHaveBeenCalledWith(POST.title.toLowerCase(), { lowercase: true });
        expect(cuid).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(DB_ERROR);
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should successfully create a new post', async () => {
        Post.create = jest.fn().mockResolvedValue(POST);
        slug.mockReturnValue(POST.slug);
        cuid.mockReturnValue(POST.cuid);

        await addPost(req, res);

        expect(Post.create).toHaveBeenCalledWith(POST);
        expect(slug).toHaveBeenCalledWith(POST.title.toLowerCase(), { lowercase: true });
        expect(cuid).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ post: POST });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});


describe('Get post', () => {
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
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle server error and return 500', async () => {
        const findOneMock = jest.fn().mockReturnThis();
        const execMock = jest.fn().mockImplementation(callback => {
            callback(DB_ERROR);
        });

        Post.findOne = findOneMock;
        findOneMock.mockReturnValue({ exec: execMock });

        await getPost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(execMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(DB_ERROR);
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should successfully retrieve a post', async () => {
        const findOneMock = jest.fn().mockReturnThis();
        const execMock = jest.fn().mockImplementation(callback => {
            callback(null, POST);
        });

        Post.findOne = findOneMock;
        findOneMock.mockReturnValue({ exec: execMock });

        await getPost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(execMock).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ post: POST });
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});

describe('Delete post', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                cuid: CUID,
            },
            headers: {
                authorization: TOKEN,
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

    it('should respond error 404 for a non-existing post', async () => {
        Post.findOne = jest.fn().mockResolvedValue(null);

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: 'Post not found.' });
        expect(token.decode).not.toHaveBeenCalled();
    });

    it('should respond error 403 when it is not allowed to delete the post', async () => {
                const findOneMock = jest.fn().mockReturnThis();
        const execMock = jest.fn().mockImplementation(callback => {
            callback(null, POST);
        });

        token.decode = jest.fn().mockReturnValue({user: {username: LOGGED_USER}});
        const post = { name: POST_AUTHOR, delete: jest.fn().mockResolvedValue(true)};
        Post.findOne = jest.fn().mockResolvedValue(post);

        token.decode = jest.fn().mockReturnValue({user: {username: LOGGED_USER}});

        await deletePost(req, res);

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ message: 'Not allowed to delete post.' });
    });

    it('should handle server error and return 500', async () => {
        Post.findOne = jest.fn().mockRejectedValue(DB_ERROR);

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(DB_ERROR);
        expect(token.decode).not.toHaveBeenCalled();
    });

    it('should delete a post and return 200 status', async () => {
        const post = { name: LOGGED_USER, delete: jest.fn().mockResolvedValue(true)};
        Post.findOne = jest.fn().mockResolvedValue(post);
        token.decode = jest.fn().mockReturnValue({user: {username: LOGGED_USER}});

        await deletePost(req, res);

        expect(Post.findOne).toHaveBeenCalledWith({ cuid: CUID });
        expect(post.delete).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });

});
