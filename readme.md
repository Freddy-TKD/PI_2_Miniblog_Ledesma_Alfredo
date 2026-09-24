# MiniBlog API

Esta API sirve para guardar y consultar autores y publicaciones de un blog pequeño.

Pensalo como el “cerebro” del blog: no tiene pantalla ni botones, pero sí permite crear, leer, actualizar y borrar datos desde una aplicación web o desde una herramienta como Postman o Thunder Client.

Si alguien que no sabe nada de programación quiere levantar este proyecto, esta guía está escrita para explicarlo de forma simple y clara.

## ¿Qué es esto?

La API permite manejar dos cosas:

- autores
- publicaciones (posts)

Cada autor puede tener varios posts, y cada post pertenece a un autor.

## ¿Para qué sirve?

Te sirve para:

- guardar autores del blog
- guardar posts del blog
- actualizar información
- borrar registros
- consultar todo desde internet o desde tu computadora

## ¿Qué tecnología usa?

- Node.js: para correr el backend
- Express: para crear la API
- PostgreSQL: para guardar los datos
- Swagger: para ver la documentación de la API en el navegador
- Vitest: para probar que todo funcione

## Estructura del proyecto

```bash
PI_2_Miniblog_Ledesma_Alfredo/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── db/
│   │   ├── pool.js
│   │   └── test.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   └── services/
│       ├── authors.service.js
│       └── posts.service.js
├── sql/
│   ├── setup.sql
│   └── seed.sql
├── __tests__/
│   ├── authors.test.js
│   └── posts.test.js
├── .env.example
├── openapi.json
├── package.json
├── prompts.md
├── readme.md
├── vitest.config.js
├── vitest.setup.js
└── .env
```

Si no entendés todas estas carpetas todavía, no pasa nada. En resumen:

- `src/` tiene todo el código principal
- `sql/` tiene las instrucciones para crear la base de datos
- `__tests__/` tiene pruebas automáticas
- `.env` guarda la configuración local

## Requisitos previos

Necesitás tener esto instalado en tu computadora:

- Node.js 20 o más
- PostgreSQL corriendo
- Git
- Opcional: pgAdmin, Postman o Thunder Client

Para verificar que Node está bien instalado:

```bash
node -v
```

Para verificar PostgreSQL:

```bash
psql --version
```

## Paso 1: clonar el proyecto

```bash
git clone <URL-del-repositorio>
cd PI_2_Miniblog_Ledesma_Alfredo
```

## Paso 2: instalar dependencias

```bash
npm install
```

Esto instala todo lo que la API necesita para funcionar.

## Paso 3: crear la base de datos

Primero, crea una base de datos nueva en PostgreSQL. Por ejemplo:

```bash
psql -U postgres -c "CREATE DATABASE miniblog_ledesma;"
```

Si preferís, podés hacerlo desde pgAdmin con la interfaz visual.

## Paso 4: crear las tablas y cargar datos iniciales

Ejecutá estas dos líneas:

```bash
psql -U postgres -d miniblog_ledesma -f sql/setup.sql
psql -U postgres -d miniblog_ledesma -f sql/seed.sql
```

Esto hace dos cosas:

- crea las tablas `authors` y `posts`
- agrega algunos datos de ejemplo para que no arranques vacío

## Paso 5: configurar las variables de entorno

Creá un archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Si estás en Windows:

```bash
copy .env.example .env
```

Luego completá ese archivo con tus datos reales. Tiene que quedar algo así:

```env
PGUSER=postgres
PGPASSWORD=tu_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=miniblog_ledesma
```

### ¿Qué significa cada una?

- `PGUSER`: usuario de PostgreSQL
- `PGPASSWORD`: contraseña del usuario
- `PGHOST`: dónde está la base (generalmente `localhost`)
- `PGPORT`: puerto de PostgreSQL (`5432` normalmente)
- `PGDATABASE`: nombre de la base de datos que creaste

## Paso 6: levantar la API

Ejecutá:

```bash
npm run dev
```

Si todo está bien, la API va a quedar corriendo en:

- http://localhost:3000

Y al entrar a la raíz, por ejemplo a:

- http://localhost:3000/

deberías ver algo parecido a:

```json
{ "message": "MiniBlog API funcionando" }
```

## ¿Cómo probar la API?

Hay dos formas:

### 1. Desde la documentación Swagger

Abrí esta URL en tu navegador:

- http://localhost:3000/api-docs

Ahí podés ver todos los endpoints y probarlos desde la interfaz.

### 2. Desde la terminal con curl

Por ejemplo:

```bash
curl http://localhost:3000/authors
```

Eso devuelve la lista de autores.

## Endpoints principales

https://pi2miniblogledesmaalfredo-production.up.railway.app/authors

https://pi2miniblogledesmaalfredo-production.up.railway.app/posts

La API tiene estos endpoints importantes:

### Autores

| Método | Ruta | Qué hace |
|---|---|---|
| GET | /authors | Lista todos los autores |
| GET | /authors/:id | Trae un autor por ID |
| POST | /authors | Crea un autor |
| PUT | /authors/:id | Actualiza un autor |
| DELETE | /authors/:id | Borra un autor |

### Posts

| Método | Ruta | Qué hace |
|---|---|---|
| GET | /posts | Lista todos los posts |
| GET | /posts/:id | Trae un post por ID |
| GET | /posts/author/:authorId | Trae todos los posts de un autor |
| POST | /posts | Crea un post |
| PUT | /posts/:id | Actualiza un post |
| DELETE | /posts/:id | Borra un post |

## Ejemplos simples

### Crear un autor

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","bio":"Escritora"}'
```

### Ver todos los autores

```bash
curl http://localhost:3000/authors
```

### Crear un post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primer post","content":"Contenido del post","author_id":1}'
```

### Ver todos los posts

```bash
curl http://localhost:3000/posts
```

## ¿Qué datos guarda?

La base de datos tiene dos tablas principales.

### Tabla `authors`

Guarda información de cada autor:

- id
- name
- email
- bio
- created_at

### Tabla `posts`

Guarda información de cada publicación:

- id
- title
- content
- author_id
- published
- created_at

La relación es:

- un autor puede tener muchos posts
- cada post pertenece a un solo autor

## Reglas importantes

La API valida varias cosas para evitar errores:

- si falta un nombre o email al crear un autor, devuelve error
- si falta título, contenido o autor al crear un post, devuelve error
- no puede haber dos autores con el mismo email
- si buscas un dato que no existe, devuelve error 404
- si borrás un autor, sus posts también se borran

## Cómo correr los tests

Para validar que la API funciona:

```bash
npm test
```

Esto corre pruebas automáticas que revisan el funcionamiento de autores y posts.

## ¿Y si algo falla?

Estos son los errores más comunes:

### 1. Error de conexión a PostgreSQL

Se ve algo como:

```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solución:

- revisar que PostgreSQL esté corriendo
- revisar que el `.env` tenga bien los datos

### 2. Error de contraseña

Se ve algo como:

```bash
password authentication failed
```

Solución:

- revisar `PGUSER` y `PGPASSWORD` en el archivo `.env`

### 3. La API arranca pero falla al consultar autores

Solución:

```bash
psql -U postgres -d miniblog_ledesma -f sql/setup.sql
psql -U postgres -d miniblog_ledesma -f sql/seed.sql
```

### 4. El puerto 3000 ya está ocupado

Solución:

- cerrar otra app que esté usando ese puerto
- o cambiar el puerto en `src/server.js`

## Deploy en producción

La API está desplegada en Railway y se puede consumir desde:

- https://pi2miniblogledesmaalfredo-production.up.railway.app

La documentación Swagger está en:

- https://pi2miniblogledesmaalfredo-production.up.railway.app/api-docs

## Resumen rápido para empezar desde cero

Si alguien quiere arrancar este proyecto sin saber mucho, lo mínimo que necesita hacer es:

1. Clonar el repo
2. Instalar dependencias con `npm install`
3. Crear una base PostgreSQL
4. Crear el archivo `.env`
5. Ejecutar `sql/setup.sql` y `sql/seed.sql`
6. Levantar la app con `npm run dev`
7. Probar la API en Swagger o con curl
8. Ejecutar `npm test`

## Nota final

Este proyecto es una API de backend para un mini blog. No tiene interfaz gráfica, pero sí sirve como base para que un frontend pueda conectarse y mostrar autores y publicaciones.

Si alguien quiere seguir trabajando con este proyecto, lo más importante es entender esto:

- la API recibe peticiones HTTP
- la base de datos guarda la información
- los endpoints permiten crear y consultar datos
- con todo esto se arma un blog funcional

## Uso de IA

Este proyecto fue desarrollado con apoyo de inteligencia artificial como ayuda de aprendizaje y apoyo durante la implementación. El detalle completo se registra en [prompts.md](prompts.md).

A continuación, algunas capturas de ejemplo de las consultas que se hicieron a la IA para ordenar dudas, corregir errores y aprender paso a paso.

### Ayuda para solucionar la visualizacion de las etiquetas en Swagger
![Se cosulta porque no se muestra bien en Swagger las etiquetas](/Screenshoot_IA/consulta_Etiquetas_Swagger.png)


### Donde Crear el .env y .gitignore y no ejecutar el git Init
![donde se colocan los archivos.env y .gitignore](/Screenshoot_IA/donde_creo_env_y_el_gitignore.png)

### Es correcto el icono para este tipo de archivo?
![Se consulta a la IA si es correcto el icono del archivo creado](/Screenshoot_IA/dudas_el_icono_AuthorServiceJS.png)

### Como crear un Autor en ThunerClient

![Consulta sobre sobre como se usa thunderClient](/Screenshoot_IA/como_crear_Authors_en_Thunder.png)