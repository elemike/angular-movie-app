# 🎬 Angular Movie App — Prueba Técnica Frontend

Aplicación web desarrollada con **Angular** utilizando **Standalone Architecture**, que consume la API REST de **The Movie Database (TMDb)** para visualizar y buscar películas populares en tiempo real.

Este proyecto fue desarrollado como solución a una **prueba técnica para el rol de Desarrollador Frontend**.

---

## 🚀 Demo en Vivo

La aplicación se encuentra desplegada en **GitHub Pages**.

👉 **[Ver aplicación en vivo](https://elemike.github.io/angular-movie-app/)**

---

## ✨ Características Principales

### 🧩 Standalone Components

Implementación de la arquitectura moderna de Angular mediante **Standalone Components**, evitando el uso de módulos monolíticos (`NgModule`) y favoreciendo una estructura más modular y mantenible.

### 🔎 Búsqueda Reactiva en Tiempo Real

Sistema de búsqueda de películas utilizando **RxJS**, implementando:

* `debounceTime(400)` para evitar peticiones innecesarias.
* `distinctUntilChanged()` para evitar consultas repetidas.
* Manejo reactivo del flujo de búsqueda y resultados.

### 📄 Paginación Dinámica

Integración de la paginación proporcionada por la API de TMDb mediante **Angular Material `MatPaginator`**.

### 🎨 UI Elegante y Accesible

Interfaz desarrollada utilizando **Angular Material**, con componentes adaptativos y responsivos:

* `MatTable`
* `MatPaginator`
* `MatFormField`
* `MatProgressSpinner`
* `MatSnackBar`

### ⏳ Manejo de Estados

Control reactivo de diferentes estados de la aplicación:

* Estado de carga.
* Indicadores visuales mediante spinners.
* Resultados vacíos.
* Errores de conexión.
* Notificaciones mediante `MatSnackBar`.

### 🧪 Pruebas Unitarias

Pruebas unitarias implementadas y ejecutadas mediante **Vitest**, verificando el comportamiento de los principales servicios y componentes de la aplicación.

---

## 🛠️ Tecnologías y Herramientas

| Tecnología / Herramienta | Uso                                                    |
| ------------------------ | ------------------------------------------------------ |
| **Angular 18+**          | Framework principal utilizando Standalone Architecture |
| **TypeScript**           | Lenguaje principal y tipado estático                   |
| **Angular Material**     | Librería de componentes UI accesibles y responsivos    |
| **RxJS**                 | Programación reactiva y manejo de flujos de datos      |
| **TMDb API v3**          | Fuente de datos de películas                           |
| **Vitest**               | Framework / runner para pruebas unitarias              |
| **SASS (SCSS)**          | Preprocesador para estilos modulares                   |
| **angular-cli-ghpages**  | Despliegue de la aplicación en GitHub Pages            |

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── # Interfaces de datos (Movie, MovieApiResponse)
│   │   └── services/
│   │       └── # Servicios HTTP (MovieService)
│   │
│   ├── features/
│   │   └── movies/
│   │       └── pages/
│   │           └── movie-list/
│   │               ├── # Vista principal
│   │               ├── # Lógica del componente
│   │               ├── # Template HTML
│   │               └── # Estilos SCSS
│   │
│   ├── app.component.ts
│   └── app.config.ts
│
├── environments/
│   └── # Variables de entorno y configuración de TMDb
│
├── main.ts
└── styles.scss
```

### Arquitectura

La aplicación está organizada siguiendo una separación por responsabilidades:

```text
Core
 ├── Models
 └── Services

Features
 └── Movies
     └── Movie List
```

Esto permite mantener separadas las responsabilidades de **datos, servicios, lógica de negocio y presentación**.

---

## ⚙️ Configuración e Instalación Local

### Prerrequisitos

Antes de ejecutar el proyecto necesitas tener instalado:

* **Node.js:** v18.x o superior
* **npm:** v9.x o superior
* **Angular CLI**

Para instalar Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

---

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/mcruz99/angular-movie-app.git
cd angular-movie-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la API Key de TMDb

La aplicación utiliza la API de **The Movie Database (TMDb)**.

Crea o edita el archivo:

```text
src/environments/environment.ts
```

Y configura tus credenciales:

```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'TU_TMDB_API_KEY_AQUI',
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
};
```

> ⚠️ **Importante:** No publiques tu API Key real en repositorios públicos. Utiliza variables de entorno o mecanismos seguros de configuración para proyectos reales.

---

## ▶️ Ejecutar el Proyecto

Inicia el servidor de desarrollo:

```bash
ng serve
```

Luego abre:

```text
http://localhost:4200/
```

---

## 🧪 Ejecución de Pruebas Unitarias

Para ejecutar la suite de pruebas con **Vitest**:

```bash
npm run test
```

---

## 🏗️ Compilación

### Build de producción

Para generar una versión optimizada para producción:

```bash
ng build --configuration production
```

Los archivos compilados estarán disponibles dentro de:

```text
dist/
```

---

## 🌐 Despliegue en GitHub Pages

Para generar el build utilizando la ruta correspondiente al repositorio:

```bash
ng build --configuration production --base-href /angular-movie-app/
```

Posteriormente, despliega utilizando `angular-cli-ghpages`:

```bash
npx angular-cli-ghpages --dir=dist/angular-movie-app/browser
```

La aplicación estará disponible en:

👉 **https://mcruz99.github.io/angular-movie-app/**

---

## 📡 API

Este proyecto utiliza:

**The Movie Database API v3**

La API proporciona información como:

* Títulos de películas.
* Fechas de lanzamiento.
* Sinopsis.
* Calificaciones.
* Popularidad.
* Imágenes y posters.
* Información adicional de las películas.

Más información sobre TMDb:

**https://developer.themoviedb.org/docs**

---

## 🎯 Objetivo del Proyecto

El objetivo de este proyecto es demostrar conocimientos y buenas prácticas en el desarrollo frontend utilizando Angular, incluyendo:

* Arquitectura Standalone.
* Componentización.
* Consumo de APIs REST.
* Programación reactiva con RxJS.
* Manejo de estados.
* Paginación.
* Angular Material.
* Manejo de errores.
* Pruebas unitarias.
* Organización escalable del código.
* Despliegue mediante GitHub Pages.

---

## 👨‍💻 Autor

**Michael Steven Cruz Torres**

Desarrollador Frontend | Angular | TypeScript | React

🔗 **GitHub:** https://github.com/elemike

---

## 📄 Licencia

Este proyecto fue desarrollado con fines de **prueba técnica y demostración de habilidades de desarrollo frontend**.
