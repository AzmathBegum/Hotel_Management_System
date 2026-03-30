# Use official OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the application
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Run the jar file
CMD ["java", "-jar", "target/*.jar"]