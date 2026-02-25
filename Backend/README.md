# ✂️ Peluquería API - Sistema de Gestión de Turnos

API REST diseñada para la administración integral de peluquerías y centros de estética. Este proyecto permite digitalizar la agenda, gestionar perfiles de clientes y organizar el catálogo de servicios de forma eficiente, optimizando el flujo de trabajo diario.

## 🚀 Características Principales

* **Gestión de Clientes:** CRUD completo con validaciones de datos y perfiles.
* **Sistema de Turnos:** Agendado dinámico de citas con control de disponibilidad.
* **Catálogo de Servicios:** Administración de prestaciones, duraciones y precios.
* **Arquitectura Escalable:** Estructura modular basada en controladores, servicios e interfaces para facilitar el mantenimiento.

## 🛠️ Stack Tecnológico

* **Entorno:** [Node.js / Express]
* **Lenguaje:** [TypeScript / JavaScript]
* **Base de Datos:** [PostgreSQL]

## 📂 Estructura del Proyecto

El código está organizado siguiendo principios de separación de responsabilidades:

```text
src/
 ├── controllers/    # Manejo de peticiones y respuestas HTTP
 ├── services/       # Lógica de negocio core y casos de uso
 ├── schemas/         # Esquemas y modelos de la base de datos (Database Schemas)
 ├── interfaces/     # Definición de contratos y tipos de datos
 └── routes/         # Definición de los endpoints de la API