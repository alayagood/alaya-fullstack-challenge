#here we're specifying the version of node
#we can use the :latest tag as well.
FROM node:14-slim

#here we're defining the working directory
WORKDIR /usr/src/app

#copying our dependencies to the container
COPY ./package.json ./
COPY ./package-lock.json ./

#installing all the dependencies that we copied
RUN npm install

#copying all the files inside the container
COPY . .

#exposing the port so we can access it further
EXPOSE 9000

#starting the server
CMD ["npm", "run", "dev"]