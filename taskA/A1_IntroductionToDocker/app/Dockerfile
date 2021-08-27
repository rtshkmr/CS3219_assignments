FROM node:alpine

# sets the context of the working directory:
WORKDIR /usr/src/app

# copies package files into working dir
COPY package*.json ./

RUN npm install 

# copies generated modules and other files from current dir in local (/app) to the container's working dir
COPY . .

# exposes the container's port to allows us to view it (port is as indicated by the node application)
EXPOSE 5000

# starts up the node application:
CMD ["node", "index.js"]
