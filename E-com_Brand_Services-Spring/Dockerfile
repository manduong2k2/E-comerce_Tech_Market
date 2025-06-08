# Chọn base image JDK 23 (phiên bản Java trong pom.xml là 23)
FROM eclipse-temurin:23-jdk-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Copy file jar đã build (giả sử tên file jar là e-com_brand_services.jar, bạn build ra file này)
COPY target/E-com_Brand_Services-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng ứng dụng (Spring Boot mặc định chạy 8080)
EXPOSE 8080

# Lệnh chạy jar
ENTRYPOINT ["java", "-jar", "app.jar"]