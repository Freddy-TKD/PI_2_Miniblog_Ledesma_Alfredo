# Uso de Inteligencia Artificial en el desarrollo de MiniBlog API

Durante el desarrollo de este proyecto utilicé Claude (Anthropic) como apoyo para aprender los conceptos y avanzar paso a paso, pidiendo siempre explicaciones antes de escribir código. A continuación resumo los tipos de consultas realizadas y cómo influyeron en el proyecto.

## Planificación y arranque
Pedí armar el proyecto completamente desde cero, con explicaciones paso a paso de cada cosa, en vez de recibir el código ya terminado. Esto definió la forma de trabajo de todo el proyecto: primero entender, después escribir.

## Configuración del entorno
Consulté dónde crear `.env` y `.gitignore`, y verifiqué las versiones instaladas de Node y PostgreSQL antes de arrancar. Esto ayudó a preparar la carpeta correctamente y evitar subir credenciales al repositorio.

## Conceptos base de Express
Pedí explicaciones de qué hace `express()`, el middleware `express.json()`, y los objetos `req`/`res`, con analogías simples, antes de escribir las primeras rutas.

## Corrección de errores propios
Pegué mi propio código con bugs (variables mal nombradas, asignaciones a la variable incorrecta, una propiedad mal escrita) y pedí ayuda para identificarlos, en vez de pedir el código corregido directamente. Esto me ayudó a aprender a reconocer y corregir errores comunes de JavaScript por mi cuenta.

## Conexión a PostgreSQL
Pedí explícitamente bajar el ritmo cuando sentí que la explicación de `async`/`await`, `pool.js`, los `services` y las `routes` fue demasiado rápida. Esto llevó a un repaso completo, línea por línea, de esos archivos, con ejercicios antes de cada paso nuevo.

## Migración de posts, validaciones y manejo de errores
Pedí replicar en `posts` el mismo patrón ya aprendido con `authors`, y agregar validaciones (`400`/`404`) y un manejo general de errores (`500`).

## Testing
Consulté por qué el comando de tests fallaba en Windows, y sugerí usar Vitest en lugar de Jest. Esto llevó a migrar la configuración de testing, resolviendo un problema real de compatibilidad.

## Documentación
Pedí revisar y corregir el formato de mi `README.md`, y ayuda para armar el archivo `openapi.json` y mostrarlo de forma interactiva en `/api-docs`.

## Material de estudio
Pedí armar un documento en PDF con los pasos correctos (sin los errores intermedios) y sus explicaciones, para usarlo como ayuda memoria, indicando que se fuera actualizando a medida que avanzaba el proyecto en vez de generar uno nuevo cada vez.