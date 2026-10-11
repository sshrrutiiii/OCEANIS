
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -DskipTests dependency:go-offline

COPY src/ src/

RUN ./mvnw -DskipTests package

EXPOSE 8080

CMD ["java", "-jar", "target/server-0.0.1-SNAPSHOT.jar"]
