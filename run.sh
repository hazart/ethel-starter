source .env

# uncomment if you want to install ethel and use ci ssh key for private pkg
#rm -R ethel
#git clone --depth=1 --branch=develop  https://tools.publicis.sapient.com/bitbucket/scm/ethl/ethel.git

docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

#sleep 1s

docker logs -f $APP_NAME