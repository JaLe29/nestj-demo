# Add "AS build" for later use
FROM node:12-alpine AS build

WORKDIR /usr/app
COPY ./package.json ./package.json
RUN yarn
COPY ./src ./src
COPY ./gulpfile.js ./gulpfile.js
COPY ./tsconfig.json ./tsconfig.json
RUN yarn build

COPY ./fe ./fe
RUN cd fe && yarn && yarn build

FROM node:12-alpine AS installProd
WORKDIR /usr/app
COPY --from=build /usr/app/dist ./dist
RUN cd dist && yarn --prod


FROM node:12-alpine

COPY --from=installProd /usr/app/dist /usr/app/dist
COPY --from=build /usr/app/fe/build /usr/app/fe

EXPOSE 4450
# but not its node_modules tree or anything else
CMD ["node", "/usr/app/dist/boot.js"]