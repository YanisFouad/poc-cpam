FROM php:7.2.34-fpm-alpine3.12

# Install dependencies
RUN apk --no-cache add curl wget bash dpkg

# Add and install PHP extensions
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# Install PHP extensions
RUN install-php-extensions opcache iconv soap
RUN install-php-extensions zip intl fileinfo
RUN install-php-extensions pdo mysqli pdo_mysql
RUN install-php-extensions gd

# Install Symfony CLI for alpine
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Install Node.js and NPM
RUN apk add --update nodejs npm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

WORKDIR /var/www

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install

# Install Node.js dependencies
RUN npm install

# Build assets
RUN npm run build

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]