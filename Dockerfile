FROM node:12-alpine as build

WORKDIR /app

COPY package.json /app

RUN npm install --only=prod
RUN npm install react-scripts@2.1.8 -g

COPY . /app

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]