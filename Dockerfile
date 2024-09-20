FROM node:22-alpine

# Create the directory for the app
RUN mkdir app

# Set the working directory
WORKDIR /app

# Copy the app's code to the container
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm i -g ts-node

RUN npm install

COPY . .

# Build the application (if you have a build step)
RUN npm run build

# Expose the port on which the app runs (e.g., 3000 for Node.js)
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]
