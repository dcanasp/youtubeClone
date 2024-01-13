.PHONY: all queueAndMicoservice go_server ts_server grpc_server nginx

all: queueAndMicoservice go_server ts_server grpc_server nginx

queueAndMicoservice:
# start cmd /c "docker run -d --name some-rabbit -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=ytClone -e RABBITMQ_DEFAULT_PASS=password rabbitmq:management"
	start cmd /c "docker start some-rabbit && timeout /t 60 && cd HighQualityMicroservice && make"
# the microservice needs the broker, so i have to make them go one after the other
go_server:
	start cmd /c "cd secondServer && make"

ts_server:
	start cmd /c "cd typescriptServer && npm run dev" 
# npm run production

grpc_server:
	start cmd /c "cd typescriptServer && npm run grpcDev"

nginx:
	start cmd /c "docker start my-nginx"
