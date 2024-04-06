# Stage 1: Сборка приложения Angular
FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Запуск приложения Angular
FROM nginx:alpine
COPY --from=build /app/dist/lab8-weather /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
