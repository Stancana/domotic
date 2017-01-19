FROM hypriot/rpi-node:argon

WORKDIR /src

# Install app dependencies
COPY package.json /src/
RUN npm install

# Bundle app source
COPY . /src

EXPOSE 80
CMD [ "npm", "start" ]
