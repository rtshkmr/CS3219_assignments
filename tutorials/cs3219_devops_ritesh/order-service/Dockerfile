FROM openjdk:11.0.2-jre-slim
EXPOSE 8080
# copy the jar over and call it app.jar in the container
COPY order-service-0.0.1-SNAPSHOT.jar app.jar
CMD ["java", "-jar" , "app.jar"]
# docker build -t cs3219/order-service:1.0.0 ./order-service
