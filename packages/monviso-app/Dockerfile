FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Monviso App"
ARG CIRCLE_BRANCH
ARG REACT_APP_GOOGLE_API_KEY
ENV CIRCLE_BRANCH=${CIRCLE_BRANCH} \
    REACT_APP_GOOGLE_API_KEY=${REACT_APP_GOOGLE_API_KEY}
WORKDIR /srv/monviso
RUN git clone https://github.com/ubl-chj/monviso.git ./
RUN git checkout ${CIRCLE_BRANCH}
RUN npm i npm@latest -g
RUN npm install --global lerna
RUN lerna bootstrap --hoist
RUN lerna run build
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
