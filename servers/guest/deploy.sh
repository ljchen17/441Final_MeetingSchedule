docker rm -f guest
# docker pull ljchen17/guest
docker run -d --name guest --network test -p 8200:8200 -e ADDR=:8200 -e DSN="root:password@tcp(mysql:3306)/INFO441" ljchen17/guest