# build environment
FROM node:9 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY react/package.json /usr/src/app/package.json
RUN npm install --silent
COPY react/ /usr/src/app
RUN npm run build --production

# production environment
FROM nginx:1.13
RUN rm -rf /etc/nginx/conf.d
COPY docker/conf/ /etc/nginx
COPY docker/start.sh /
RUN apt-get update && apt-get install --assume-yes curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install --assume-yes nodejs
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY expressjs/package.json /expressjs/
ADD expressjs/src /expressjs/src/
WORKDIR /expressjs
RUN npm install
RUN npm install forever -g
EXPOSE 80
CMD ["/start.sh"]
#CMD ["nginx", "-g", "daemon off;"]
