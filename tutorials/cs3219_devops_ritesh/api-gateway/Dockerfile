FROM openjdk:11.0.2-jre-slim
# unsure if right port, the archi diagram implies it should be port 80 though
EXPOSE 8080
# copy the jar over and call it app.jar in the container
COPY api-gateway-0.0.1-SNAPSHOT.jar app.jar
CMD ["java", "-jar" , "app.jar"]
# docker build -t cs3219/api-gateway:1.0.0 ./api-gateway
