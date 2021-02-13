# Build image
FROM node:alpine
ARG CONTEXT
ARG ID
ARG URL
ARG COMPONENTS

# Make sure that all the args are not empty
RUN test -n "$CONTEXT"
RUN test -n "$ID"
RUN test -n "$URL"
RUN test -n "$COMPONENTS"

# Remap args to React env vars
ENV REACT_APP_CONTEXT=$CONTEXT
ENV REACT_APP_ID=$ID
ENV REACT_APP_URL=$URL
ENV REACT_APP_COMPONENTS=$COMPONENTS

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN set -ex; \
  npm install; \
  npm run build

# Run image
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=0 /usr/src/app/build/ /usr/share/nginx/html
