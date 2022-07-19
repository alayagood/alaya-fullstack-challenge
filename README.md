``
# Alaya mern dev challenge 

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Create the local `.env` file based on `.env.dist` as an example.
```dotenv
MONGODB_USER=root
MONGODB_PASSWORD=root
MONGODB_DATABASE=mern-app-db
MONGODB_LOCAL_PORT=27017
MONGODB_DOCKER_PORT=27017

SERVER_PORT_LOCAL=9000
SERVER_PORT_DOCKER=9000
CLIENT_PORT_LOCAL=3000
CLIENT_PORT_DOCKER=3000

JWT_SECRET=%secret%
TOKEN_LIFE=7d

CLOUDINARY_NAME=%name%
CLOUDINARY_API_KEY=%key%
CLOUDINARY_API_SECRET=%secret%
```
3. Build and run your containers. 
```docker
   docker-compose up -d --build
```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
5. Api will be available at this url [http://localhost:9000/api](http://localhost:9000/api).

You can view your images created with `docker images`.


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
