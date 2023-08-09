
# Alaya mern dev challenge by Ruben Gonzalez Aranda

## Setup Documentation

IMPORTANT: .env is not in the gitignore for practical reasons, but it should be filled in with the corresponding data.
You need to create an account at https://cloudinary.com/. Once created, you can find the data in the Access Keys section of the configuration panel. Fill in the variables in the .env file.

git clone https://github.com/rubenosaka/Alaya-Fullstack-Challenge.git

Since the project is built with Vite, we need to make sure that we have Vite installed globally:
npm install -g create-vite

A MongoDB database is used, so we need to have it installed:
https://www.mongodb.com/try/download/community

Now you need to navigate to the server folder and run npm install:
cd server
npm install

Next, we will go back to the root folder and navigate to the client folder:
cd ..
cd client
npm install

Now we need to launch both services with:
npm run dev

And in the server:
cd ..
cd server
npm run dev

I have created a test for one of the components (PostCreateWidget), it is performed with Jest. Simply run the following command in the client:
npm run test

cd ..
cd client
npm run test

## Show us your skills :)

Please create a pull request for each exercise, so that we can evaluate the final features' code.
Don't hesitate to enhance the setup documentation if required.

To show us your skills we would like you to build theses 2 features:

### 1 - User account management

At first we want the users to be able to create their account to post Articles.

To do that you need to create a login page or dialog and a signup process.

We want you to use JWT to manage user session https://jwt.io/, to do that you can use passport with a JWT policy.

Only connected users will be able to create post, and only the author of the post will be able to delete it

### 2 - Picture upload

Here we want the user to be able to upload and manage pictures on his post.

Free to you to use the service you want to do that and to store your assets (like Cloudinary for example).

The purpose is to enhance post with media.

You can design the layout you want on cards and on each post page and use the styling you want.

Also if you want to add one or more features or change the layout, styling and theming about the blog you can.

Good luck :)

_Notes: For evaluation, we will mainly focus on the code structure and readability, the separation of concerns in the methods/components, and the visual consistency._
