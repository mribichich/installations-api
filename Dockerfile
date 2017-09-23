FROM node:8
LABEL maintainer="Matias Ribichich <guli4073@gmail.com.ar>"

WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
RUN NODE_ENV=production yarn build
# RUN yarn test
RUN yarn install --production


FROM node:8-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app .
ENV NODE_ENV=production
CMD ["node", "index"]
