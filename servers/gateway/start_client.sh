docker rm -f ljchen17meetingclient
docker pull ljchen17/meetingclient
docker run -d --name ljchen17meetingclient -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -e TLSCERT=/etc/letsencrypt/live/ljchen17.me/fullchain.pem -e TLSKEY=/etc/letsencrypt/live/ljchen17.me/privkey.pem ljchen17/meetingclient