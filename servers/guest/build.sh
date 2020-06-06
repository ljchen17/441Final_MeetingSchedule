GOOS=linux go build
docker build -t ice2meu/guest .
docker push ice2meu/guest