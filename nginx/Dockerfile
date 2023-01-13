ARG NGINX_VERSION=1.20.2
ARG NGINX_HEADERS_MORE_VERSION=0.33

FROM nginx:${NGINX_VERSION}-alpine AS builder

RUN wget "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz
RUN wget "https://github.com/openresty/headers-more-nginx-module/archive/v0.33.tar.gz"  -O headers-more.tar.gz


RUN apk add --no-cache --virtual .build-deps \
  git \
  gcc \
  libc-dev \
  make \
  openssl-dev \
  pcre-dev \
  zlib-dev \
  linux-headers \
  curl \
  gnupg \
  libxslt-dev \
  gd-dev \
  geoip-dev

RUN mkdir -p /usr/src
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
	tar -zxC /usr/src -f "nginx.tar.gz"
RUN tar -zxvC /usr/src -f "headers-more.tar.gz"
RUN HEADERSMOREDIR="/usr/src/headers-more-nginx-module-0.33" && \
  cd /usr/src/nginx-$NGINX_VERSION && \
  ./configure --without-http_autoindex_module --with-compat $CONFARGS --add-dynamic-module=$HEADERSMOREDIR && \
  make && make install

# Stage 1, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-alpine as builderNode

COPY web /web
WORKDIR /web

RUN npm install  && npm run --silent --no-progress build

FROM nginx:${NGINX_VERSION}-alpine


# Extract the dynamic module "headers more" from the builder image
COPY --from=builder /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so

#COPY drupal /var/www/html
COPY --from=builderNode /web/build/ /var/www/front
COPY nginx/crt /etc/nginx/crt

ARG WEB_DOMAIN
ARG SSL_CERTIFICATE
ARG SSL_KEY

ENV WEB_DOMAIN=$WEB_DOMAIN
ENV SSL_CERTIFICATE=$SSL_CERTIFICATE
ENV SSL_KEY=$SSL_KEY

COPY nginx/conf/nginx.conf /nginx.conf.template
RUN envsubst '${WEB_DOMAIN},${SSL_CERTIFICATE},${SSL_KEY}' < /nginx.conf.template > /etc/nginx/nginx.conf
#CMD ["/bin/bash" , "-c" , "envsubst \$WEB_DOMAIN < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]



