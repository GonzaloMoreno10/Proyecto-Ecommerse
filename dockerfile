FROM node:14

# Create app directory
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

ENV DATABASE_HOST=192.168.100.27
ENV DATABASE_PORT=27017

COPY --chown=node . .

EXPOSE 8080
CMD [ "node", "." ]