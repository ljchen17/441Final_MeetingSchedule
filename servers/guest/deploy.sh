docker rm -f guest
# docker pull ice2meu/guest
docker run -d --name guest --network test -p 8200:8200 -e ADDR=:8200 -e DSN="root:password@tcp(mysql:3306)/INFO441" ice2meu/guest