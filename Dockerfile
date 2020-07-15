FROM nginx:stable
MAINTAINER yopiragil  "yopi.ragil.yrpp@gmail.com"

RUN mkdir -p /altaolc/www/Alta-Online-Learning
RUN mkdir -p /altaolc/logs/nginx
#RUN mkdir -p /altaolc/cert

COPY default.conf /etc/nginx/conf.d/
COPY . /altaolc/www/Alta-Online-Learning
#COPY yopiragil_my_id.crt /altaolc/cert/
#COPY yopiragil_my_id.key /altaolc/cert/

WORKDIR /altaolc/www/Alta-Online-Learning
