# Author notes
Unfortunately, this is still not quite finished (and I apologize for it), due to the fact that I haven't had a lot of time to myself lately.
Also due to the fact that the extent of my React.js experience is a "tic-tac-toe" tutorial I did some 4 months ago on a whim: doing some react (and redux) was very interesting, but also a lot more time-consuming than I thought it would be.

The project is still missing the image upload management, I will try to work on it this week (but being on a business trip in Paris this week, I may not have a lot of time to make progress), but I figured I would at least push what I've done for now to give an idea of my progress.

I added some unit tests to the server, coverage is far from 100% but I figured what really mattered was to give a demo of how I'd normally do tests

# Alaya mern dev challenge 

## Presentation

In this project which is a MERN stack you can write and edit post blog.

This application is composed by 2 repositories, the server and the client:

- In the server repository you can find an express HTTP server that connect to a local mongo database and expose
the api.
To start the server be sure to have installed mongoDB locally as a service then go in the server repository and launch the index.js
```$xslt
    cd server
    npm i
    node index.js
```
If you want to restart the server at any change you can also install nodemon and start the server like this
```
    cd server
    npm i
    npm i -g nodemon
    nodemon index.js
```
- In the client repository you have the Front-end code of the blog that uses React and Redux.
To start the Front-end
```
    cd client
    npm i
    npm start
```

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
