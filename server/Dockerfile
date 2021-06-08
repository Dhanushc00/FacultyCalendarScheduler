FROM node:14.16.0

 

LABEL version="1.0"

LABEL description="This is the base docker for odmanagement API."

LABEL maintainer = ["sasmithaasrinivasan@gmail.com"]

 

WORKDIR /SERVER

 

COPY ["package.json", "package-lock.json","./"]
COPY . .
RUN ls

RUN npm install 
RUN npm uninstall bcrypt
RUN npm install bcrypt



 

EXPOSE 3012

 

CMD ["npm", "start"]