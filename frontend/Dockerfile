# Stage 1: Build the React app
FROM node:14 as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

CMD ["npm","run","start"]
RUN npm run build

# Stage 2: Serve the optimized production build using Nginx
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
