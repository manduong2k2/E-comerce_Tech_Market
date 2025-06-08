FROM php:8.3-fpm

# Cài các thư viện hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev zip unzip \
    libzip-dev libssl-dev libpq-dev \
    libcurl4-openssl-dev pkg-config \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo pdo_mysql mysqli \
        mbstring exif pcntl bcmath gd zip curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Tạo thư mục ứng dụng
WORKDIR /var/www/html
