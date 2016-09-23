FROM hypriot/rpi-node:argon

WORKDIR /src

# Install app dependencies
COPY package.json /src/
RUN npm config set proxy http://www-cache.ujf-grenoble.fr:3128
RUN npm config set https-proxy http://www-cache.ujf-grenoble.fr:3128
RUN npm install

# Bundle app source
COPY . /src

EXPOSE 80
CMD [ "npm", "start" ]
