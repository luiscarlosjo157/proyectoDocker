FROM maven:3.8.5-openjdk-17 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo pom.xml para descargar dependencias
COPY pom.xml .

# Descarga las dependencias (esto se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline

# Copia el resto del código fuente
COPY src ./src

# Empaqueta la aplicación, saltando los tests para una compilación más rápida
RUN mvn package -DskipTests

# Etapa 2: Creación de la imagen final con solo el JRE
FROM eclipse-temurin:17-jre-jammy

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo .jar compilado desde la etapa de compilación
COPY --from=build /app/target/*.jar app.jar

# Expone el puerto en el que Spring Boot se ejecuta (por defecto 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]