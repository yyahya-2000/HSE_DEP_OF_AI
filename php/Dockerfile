FROM php:8.0-fpm-alpine3.13

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions gd apcu uploadprogress bz2 mysqli pgsql pdo_pgsql soap sockets xsl pdo_mysql @composer && \
    rm /usr/local/bin/install-php-extensions
COPY php/conf/php.ini /usr/local/etc/php/conf.d/php.ini

#COPY drupal /var/www/html
RUN chown -R www-data: /var/www/html && \
    find /var/www/html -type d -exec chmod u=rwx,g=rx,o= '{}' \; && \
    find /var/www/html -type f -exec chmod u=rw,g=r,o= '{}' \; && \
#    chmod 400 /var/www/html/sites/default/settings.php && \
    mkdir /config_sync && chown www-data: /config_sync
