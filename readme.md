# MiniBlog API

API REST para un mini blog, desarrollada con Node.js, Express y PostgreSQL. Proyecto Integrador 2 — Módulo 2, Henry.

## Entidades

- **authors**: autores del blog.
- **posts**: publicaciones, cada una asociada a un autor (relación 1:N).

## Tecnologías

- Node.js
- Express
- PostgreSQL (librería `pg`)
- Vitest + Supertest (testing)

## Instalación y configuración

1. Clonar el repositorio.
2. Instalar las dependencias:

npm install

3. Crear la base de datos en PostgreSQL y ejecutar, en este orden, los scripts de `sql/setup.sql` y `sql/seed.sql`.
4. Copiar `.env.example` a un archivo nuevo llamado `.env`, y completar con tus propios datos de conexión a PostgreSQL.
5. Levantar el servidor:

npm run dev
  - La API queda corriendo en `http://localhost:3000`.

## Correr los tests
npm test

## Endpoints

### Authors
- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`

### Posts
- `GET /posts`
- `GET /posts/:id`
- `GET /posts/author/:authorId`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## Deploy

## Deploy

- URL pública: https://pi2miniblogledesmaalfredo-production.up.railway.app
- Documentación interactiva (Swagger): https://pi2miniblogledesmaalfredo-production.up.railway.app/api-docs