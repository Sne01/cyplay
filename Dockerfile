FROM cypress/browsers:node-18.16.0-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1

RUN mkdir /cyplay_docker_image

WORKDIR /cyplay_docker_image

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
COPY ./jsconfig.json .

RUN npm install

ENTRYPOINT ["npx","cypress","run"]

CMD [""]