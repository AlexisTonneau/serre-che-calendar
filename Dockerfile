FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm test - if you want to test before to build
RUN npm run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
EXPOSE 3000
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]