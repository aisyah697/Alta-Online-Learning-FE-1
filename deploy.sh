#!/bin/bash

eval "$(ssh-agent -s)" &&
ssh-add -k ~/.ssh/id_rsa &&

source ~/.profile
echo "$DOCKER_PASSWORD" | docker login --username $DOCKER_USERNAME --password-stdin
sudo docker stop altaonlineFE
sudo docker rm altaonlineFE
sudo docker rmi yopiragil/altaolc:latest
sudo docker run -d --name altaonlineFE -p 8443:80 yopiragil/altaolc:latest
