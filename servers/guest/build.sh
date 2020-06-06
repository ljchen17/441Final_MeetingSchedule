GOOS=linux go build
docker build -t ljchen17/guest .
docker push ljchen17/guest