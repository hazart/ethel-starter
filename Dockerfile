FROM keymetrics/pm2:8-stretch

# set workdir for the next instructions
WORKDIR /app


# copy the package.json from the host to the filesystem of the image
COPY package*.json /app/
COPY pm2.json /app
COPY dialogflow.json /app

# install the dependencies on the container using the package.json file that was copied
RUN npm install --production

# uncomment if you host do not have right for ethel private package
#COPY ethel ./ethel
#WORKDIR /app/ethel
#RUN npm install --production
#RUN npm link
#WORKDIR /app
#RUN npm link ethel-coe

EXPOSE 3000