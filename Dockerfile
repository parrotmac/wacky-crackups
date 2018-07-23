FROM node:8

EXPOSE 3000
ENV PORT 3000

WORKDIR /usr/bin/app/

ADD package.json /usr/bin/app/
ADD package-lock.json /usr/bin/app/

RUN npm install

ADD . /usr/bin/app

CMD ["npm", "start"]
