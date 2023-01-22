FROM php:8.0-fpm

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions  curl mbstring openssl gd apcu uploadprogress bz2 pgsql pdo_pgsql soap sockets xsl @composer && \
    rm /usr/local/bin/install-php-extensions
COPY php/conf/php.ini /usr/local/etc/php/conf.d/php.ini

COPY drupal /var/www/html
RUN chown -R www-data: /var/www/html && \
    find /var/www/html -type d -exec chmod u=rwx,g=rx,o= '{}' \; && \
    find /var/www/html -type f -exec chmod u=rw,g=r,o= '{}' \; && \
    chmod 400 /var/www/html/sites/default/settings.php && \
    mkdir /config_sync && chown www-data: /config_sync
