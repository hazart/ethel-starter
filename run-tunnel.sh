source .env

echo "======> LOCAL TUNNEL ENDPOINT" 
ssh -R 80:localhost:$VIRTUAL_PORT serveo.net