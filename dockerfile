#Specify a base image
FROM node:18

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package.json /usr/app

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./ /usr/app

#Default command
CMD ["node","app.js"]