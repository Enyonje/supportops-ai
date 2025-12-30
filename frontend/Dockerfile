FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# This runs the Vite dev server inside the container
CMD ["npm", "run", "dev", "--", "--host"]