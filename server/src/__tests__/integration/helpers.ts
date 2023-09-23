import request from 'supertest';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT;

import Post from '../../models/post';
import User from '../../models/user';

const baseURL = `http://localhost:${PORT}/api`;


export async function waitForServerToStart(url: string, timeout = 30000) {
    const startTimestamp = Date.now();

    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            await request(url).get('/posts');


            break; // Server is up
        } catch (error) {
            if (Date.now() - startTimestamp > timeout) {
                throw new Error('Server did not start within the timeout.');
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

export async function deletePostRequest(cuid: string, token?: string) {
    let req = request(baseURL).delete(`/posts/${cuid}`);
    if (token) {
        req = req.set('Authorization', `Bearer ${token}`);
    }
    return req;
}

export async function createPostWithUser(title: string, name: string, content: string, userId: any) {
    const newPost = new Post({ title, name, content, cuid: '1', slug: title, user_id: userId });
    return newPost.save();
}

export async function createPost(title: string, name: string, content: string) {
    const newPost = new Post({ title, name, content, cuid: '1', slug: title, user_id: '1' });
    return newPost.save();
}

export async function createPostRequest(title: string, name: string, content: string, token?: string, file?: string) {
    // const post = { title, name, content };
    let req = request(baseURL).post('/posts').field("title", title).field('name', name).field("content", content)
    if (file) {
        req.attach('image', file)
    }
    if (token) {
        req = req.set('Authorization', `Bearer ${token}`);
    }

    return req;
}

export async function createUser(email: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, password: hashedPassword });
    return user.save();
}

export async function loginUser(email: string, password: string) {
    const response = await request(baseURL).post('/users/login').send({ email, password });
    return response.body;
}


export async function clearUsers() {
    await User.deleteMany({});
}



export async function signupUser(email: string, password: string) {
    return request(baseURL).post('/users/signup').send({ email, password });
}