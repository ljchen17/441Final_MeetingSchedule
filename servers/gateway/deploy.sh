sh build.sh
docker push ljchen17/gateway
ssh ec2-user@ec2-18-211-77-232.compute-1.amazonaws.com < start_server.sh