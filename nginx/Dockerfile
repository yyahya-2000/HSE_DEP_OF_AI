ARG NGINX_VERSION=1.23.3
ARG NGINX_HEADERS_MORE_VERSION=0.34

FROM nginx:${NGINX_VERSION}-alpine AS builder

RUN wget "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" -O nginx.tar.gz
RUN wget "https://github.com/openresty/headers-more-nginx-module/archive/v0.34.tar.gz"  -O headers-more.tar.gz


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
  geoip-dev \
  openssl

RUN openssl dhparam -out /dhparam.pem 2048

RUN mkdir -p /usr/src
RUN CONFARGS=$(nginx -V 2>&1 | sed -n -e 's/^.*arguments: //p') \
	tar -zxC /usr/src -f "nginx.tar.gz"
RUN tar -zxvC /usr/src -f "headers-more.tar.gz"
RUN HEADERSMOREDIR="/usr/src/headers-more-nginx-module-0.34" && \
  cd /usr/src/nginx-$NGINX_VERSION && \
  ./configure --without-http_autoindex_module --with-compat $CONFARGS --add-dynamic-module=$HEADERSMOREDIR && \
  make && make install

# Stage 1, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-alpine as builderNode

COPY web /web
WORKDIR /web

RUN npm install  && npm run --silent --no-progress build

FROM nginx:${NGINX_VERSION}


# Extract the dynamic module "headers more" from the builder image
COPY --from=builder /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so /usr/local/nginx/modules/ngx_http_headers_more_filter_module.so
COPY --from=builder /dhparam.pem /etc/nginx/crt/dhparam.pem

COPY drupal /var/www/html
RUN chown -R nginx:www-data /var/www/html
COPY --from=builderNode /web/build/ /var/www/front
RUN chown -R nginx:www-data /var/www/front
COPY nginx/crt /etc/nginx/crt

ARG WEB_DOMAIN
ARG SSL_CERTIFICATE
ARG SSL_KEY

ENV WEB_DOMAIN=$WEB_DOMAIN
ENV SSL_CERTIFICATE=$SSL_CERTIFICATE
ENV SSL_KEY=$SSL_KEY

COPY nginx/conf/ /conf/
RUN envsubst '${WEB_DOMAIN},${SSL_CERTIFICATE},${SSL_KEY}' < /conf/conf.d/site.conf > /etc/nginx/conf.d/site.conf && \
    #cp -f /conf/conf.d/default.conf /etc/nginx/conf.d/default.conf &&  \
    #cp /conf/conf.d/superset.conf /etc/nginx/conf.d/superset.conf && \
    cp /conf/nginx.conf /etc/nginx/nginx.conf && \
    rm -rf /conf




#CMD ["/bin/bash" , "-c" , "envsubst \$WEB_DOMAIN < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
