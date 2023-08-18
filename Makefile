include .env
export

create-mongodb:
	docker run -d --name mongodb-container \
	-e MONGO_INITDB_ROOT_USERNAME=${MONGO_ADMIN_USER} \
	-e MONGO_INITDB_ROOT_PASSWORD=${MONGO_ADMIN_PASS} \
	-e MONGO_INITDB_DATABASE=${MONGO_DATABASE} \
	-p 27017:27017 \
	mongo

start-mongodb:
	docker start mongodb-container

create-user:
	docker exec -it mongodb-container \
	mongosh admin -u ${MONGO_ADMIN_USER} -p ${MONGO_ADMIN_PASS} \
	--eval 'db.getSiblingDB("'${MONGO_DATABASE}'").createUser({ user: "'${MONGO_USER}'", pwd: "'${MONGO_PASS}'", roles: [{ role: "readWrite", db: "'${MONGO_DATABASE}'" }] })'


create-collection:
	docker exec -it mongodb-container mongosh -u ${MONGO_ADMIN_USER} -p ${MONGO_ADMIN_PASS} \
    --authenticationDatabase admin --eval "use ${MONGO_DATABASE}; db.createCollection('users')"


.PHONY: start-mongodb start-mongodb create-collection create-user create-collection

