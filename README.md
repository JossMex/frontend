# 📦 Sistema de Gestión de Inventario / Inventory Management System

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)
![Angular](https://img.shields.io/badge/Angular-17-red)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🇲🇽 Español

Sistema web full stack para la gestión de inventario de productos, desarrollado con Java Spring Boot en el backend y Angular en el frontend.

### ✨ Funcionalidades

- 📋 **CRUD completo de productos** — crear, leer, actualizar y eliminar
- 🔍 **Búsqueda en tiempo real** por nombre de producto
- ⚠️ **Alertas de stock bajo** — detecta productos por debajo del mínimo
- 🗂️ **Gestión de categorías** — clasificación de productos
- 📊 **Panel de control** con conteo total de productos
- 🐳 **Base de datos en Docker** — sin instalación local de MySQL

### 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 17, Bootstrap 5 |
| Backend | Java 17, Spring Boot 3.2 |
| Base de datos | MySQL 8.0 |
| ORM | Spring Data JPA / Hibernate |
| Contenedores | Docker |
| Control de versiones | Git / GitHub |

### 🏗️ Arquitectura del proyecto

```
┌─────────────────────────────────────────────┐
│           Angular (Puerto 4200)             │
│   lista-productos │ form-producto │ navbar  │
└─────────────────────────┬───────────────────┘
                          │ HTTP REST
┌─────────────────────────▼───────────────────┐
│         Spring Boot (Puerto 8081)           │
│  Controller → Service → Repository → Model  │
└─────────────────────────┬───────────────────┘
                          │ JPA / Hibernate
┌─────────────────────────▼───────────────────┐
│           MySQL 8.0 (Docker :3306)          │
│         productos │ categorias              │
└─────────────────────────────────────────────┘
```

### 📁 Estructura del proyecto

```
inventario/
├── backend/                    # Spring Boot
│   ├── src/main/java/com/inventario/backend/
│   │   ├── config/             # Configuración CORS
│   │   ├── controller/         # Endpoints REST
│   │   ├── model/              # Entidades JPA
│   │   ├── repository/         # Acceso a datos
│   │   └── service/            # Lógica de negocio
│   ├── Dockerfile
│   └── pom.xml
└── frontend/                   # Angular
    └── src/app/
        ├── components/
        │   ├── lista-productos/
        │   ├── form-producto/
        │   ├── stock-bajo/
        │   └── navbar/
        ├── services/
        └── environments/
```

### 🚀 Instalación y ejecución local

#### Prerequisitos
- Java 17+
- Node.js 18+
- Angular CLI
- Docker Desktop

#### 1. Clonar el repositorio
```bash
git clone https://github.com/JossMex/inventario.git
cd inventario
```

#### 2. Levantar la base de datos
```bash
docker run -d \
  --name mysql-inventario \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=inventario_db \
  -p 3306:3306 \
  mysql:8.0
```

#### 3. Ejecutar el backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend disponible en: `http://localhost:8081`

#### 4. Ejecutar el frontend
```bash
cd frontend
npm install
ng serve
```
Frontend disponible en: `http://localhost:4200`

### 🔗 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| GET | `/api/productos/buscar?nombre=x` | Buscar por nombre |
| GET | `/api/productos/stock-bajo` | Productos con stock bajo |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |
| GET | `/api/categorias` | Listar categorías |
| POST | `/api/categorias` | Crear categoría |
---

## 🇺🇸 English

A full stack web application for inventory management, built with Java Spring Boot on the backend and Angular on the frontend.

### ✨ Features

- 📋 **Full CRUD for products** — create, read, update and delete
- 🔍 **Real-time search** by product name
- ⚠️ **Low stock alerts** — detects products below minimum threshold
- 🗂️ **Category management** — product classification
- 📊 **Dashboard** with total product count
- 🐳 **Dockerized database** — no local MySQL installation required

### 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17, Bootstrap 5 |
| Backend | Java 17, Spring Boot 3.2 |
| Database | MySQL 8.0 |
| ORM | Spring Data JPA / Hibernate |
| Containers | Docker |
| Version Control | Git / GitHub |

### 🚀 Local Setup

#### Prerequisites
- Java 17+
- Node.js 18+
- Angular CLI
- Docker Desktop

#### 1. Clone the repository
```bash
git clone https://github.com/JossMex/inventario.git
cd inventario
```

#### 2. Start the database
```bash
docker run -d \
  --name mysql-inventario \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=inventario_db \
  -p 3306:3306 \
  mysql:8.0
```

#### 3. Run the backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend available at: `http://localhost:8081`

#### 4. Run the frontend
```bash
cd frontend
npm install
ng serve
```
Frontend available at: `http://localhost:4200`

### 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/productos` | List all products |
| GET | `/api/productos/{id}` | Get product by ID |
| GET | `/api/productos/buscar?nombre=x` | Search by name |
| GET | `/api/productos/stock-bajo` | Low stock products |
| POST | `/api/productos` | Create product |
| PUT | `/api/productos/{id}` | Update product |
| DELETE | `/api/productos/{id}` | Delete product |
| GET | `/api/categorias` | List categories |
| POST | `/api/categorias` | Create category |

### 📄 License

This project is licensed under the MIT License.

---

Developed by **José Carlos Avila Martínez** — [GitHub](https://github.com/JossMex) · [LinkedIn](https://www.linkedin.com/in/carlos-avila561617163)
