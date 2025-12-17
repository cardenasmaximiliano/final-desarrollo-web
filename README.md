# PROYECTO FINAL - DESARROLLO WEB

Este proyecto es un PROYECTO FRONTEND desarrollada como trabajo final. Se dio enfasis en  la maquetación y estilos del sitio, con una pequeña capa de interactividad.

## Tecnologías utilizadas

- **HTML5**: estructura semántica del sitio.
- **CSS3**: estilos, layout (grillas), responsive y estética general.
- **JavaScript Vanilla**: lógica básica para **simular persistencia de datos** usando **localStorage** (guardar / cargar / borrar datos del formulario).

## Persistencia

El formulario no envía información a un servidor.  
En su lugar, los datos se guardan localmente en el navegador mediante:

- `localStorage.setItem(...)`
- `localStorage.getItem(...)`
- `localStorage.removeItem(...)`

Esto permite demostrar el concepto de “persistencia” dentro de un contexto 100% frontend.

## Metodología de clases (BEM)

Para mantener el código ordenado y escalable, se utilizó la metodología **BEM (Block, Element, Modifier)**:

- **Bloque**: componente principal (ej: `portada`, `barra-superior`)
- **Elemento**: parte interna del bloque (ej: `portada__contenido`, `barra-superior__contenedor`)
- **Modificador**: variación del bloque/elemento (ej: `seccion--oscura`, `boton--primario`)

## Cómo ejecutar

1. Clonar o descargar el proyecto
2. Abrir `index.html` en el navegador
