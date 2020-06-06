docker system prune --all --force
docker system prune --volumes --force
docker network disconnect -f mainnetwork ljchen17gateway
docker network disconnect -f mainnetwork ljchen17redis
docker network disconnect -f mainnetwork ljchen17mysqldemo
docker network disconnect -f mainnetwork ljchen17guest
docker network disconnect -f mainnetwork ljchen17group
docker network rm mainnetwork
docker network create mainnetwork

docker rm -f ljchen17redis
docker run -p 6379:6379 --name ljchen17redis -d redis
docker rm -f ljchen17mysqldemo
docker pull ljchen17/mysqldemo
docker run -d -e MYSQL_ROOT_PASSWORD=Hdkme7294 --name ljchen17mysqldemo -p 3306:3306 ljchen17/mysqldemo

docker rm -f ljchen17group
docker pull ljchen17/group
docker run -d --name ljchen17group -p 8100:8100 -e ADDR=:8100 ljchen17/group

docker rm -f ljchen17guest
docker pull ljchen17/guest
docker run -d --name ljchen17guest -p 8200:8200 --network=mainnetwork ljchen17/guest

docker rm -f ljchen17gateway
docker pull ljchen17/gateway
docker run -d --name ljchen17gateway -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -e TLSCERT=/etc/letsencrypt/live/api.ljchen17.me/fullchain.pem -e TLSKEY=/etc/letsencrypt/live/api.ljchen17.me/privkey.pem -e SESSIONKEY=hfewi1 -e REDISADDR=ljchen17redis:6379 -e DSN="root:Hdkme7294@tcp(ljchen17mysqldemo:3306)/INFO441"  -e GROUPADDR=ljchen17group:8100 -e GUESTADDR=ljchen17guest:8200 ljchen17/gateway

docker network connect mainnetwork ljchen17gateway
docker network connect mainnetwork ljchen17redis
docker network connect mainnetwork ljchen17mysqldemo
docker network connect mainnetwork ljchen17group
docker network connect mainnetwork ljchen17guest