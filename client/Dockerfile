FROM node:14.16.0

 

LABEL version="1.0"

LABEL description="This is the base docker image for frontend react app odmanagement."

LABEL maintainer = ["sasmithaasrinivasan@gmail.com"]

 

WORKDIR /CLIENT

 

COPY ["package.json",  "./"]

RUN ls

RUN npm install 

COPY . .

 

EXPOSE 3000

 

CMD ["yarn", "start"]