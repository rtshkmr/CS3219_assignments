# builds the nginx image, config found in /nginx
FROM nginx:alpine
COPY ./nginx/default.conf etc/nginx/default.conf
COPY ./nginx/index.html /usr/share/nginx/html/index.html