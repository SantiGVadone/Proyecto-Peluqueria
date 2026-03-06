# 💈 Hair Salon Management System - API v1.0

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Sistema integral de gestión para peluquerías desarrollado en la **UTN FRH**. Esta API implementa una arquitectura **Multi-tenant**, garantizando que cada negocio opere de forma aislada y segura bajo una misma infraestructura.

---

## 🏗️ Lógica de Dominio y Dependencias

Para asegurar la integridad de los datos, el sistema sigue una jerarquía estricta:

* **Entidad Raíz (Business)**: Es el eje del sistema. No se pueden crear empleados, clientes o servicios sin un `business_id` válido.
* **Aislamiento de Datos**: Todas las consultas SQL filtran automáticamente por el `business_id` extraído del JWT del usuario. Esto impide que un negocio acceda a la información de otro.
* **Registro de Jefe (Boss)**: Al registrarse un dueño, se crea de forma atómica su cuenta y el perfil del negocio, vinculándolos permanentemente.
* **Trigger de Facturación**: Cuando un turno (`Appointment`) cambia su estado a `COMPLETED`, el sistema genera automáticamente un registro inmutable en la tabla de `Records` para el historial contable.



---

## 🔐 Control de Acceso (RBAC)

El sistema valida permisos mediante middlewares de rol y pertenencia al negocio:

| Módulo | ADMIN | BOSS | EMPLOYEE |
| :--- | :---: | :---: | :---: |
| **Appointments** | Full Access | Full Access | Full Access |
| **Bonus** | Full Access | Full Access | Solo Lectura |
| **Business** | Full Access | Ver/Update Propio | Sin acceso |
| **Clients** | Full Access | Full Access | Full Access |
| **Employees** | Full Access | Full Access | Ver/Update Propio |
| **Records** | Full Access | Full Access | Full Access |

---

## 📌 Endpoints Principales

### 🔑 Autenticación (Auth)
* `POST /auth/register-boss`: Registro de dueño y creación de negocio.
* `POST /auth/register-employee`: Registro de staff vinculado al negocio.
* `POST /auth/login`: Login general y entrega de token JWT.

### 📅 Turnos y Finanzas (Appointments & Records)
* `GET /appointments`: Agenda filtrada por negocio.
* `PATCH /appointments/:id`: Actualización de estado. Si se marca como **COMPLETED**, dispara la creación del registro contable.
* `GET /records`: Historial de ventas inmutable por negocio, empleado o cliente.

### 👥 Personal y Clientes
* `GET /employees`: Listado de staff perteneciente al local.
* `GET /clients`: Gestión de la cartera de clientes propia.
* `POST /bonus`: (Solo BOSS) Asignación de premios o incentivos.

---

## ⚙️ Instalación y Configuración

1.  **Dependencias**: `npm install`
2.  **Variables de Entorno**: Configurar `.env` con las credenciales de PostgreSQL y `JWT_SECRET`.
3.  **Base de Datos**: Ejecutar el script SQL de inicialización para crear las tablas con sus respectivas llaves foráneas y cascadas.
4.  **Ejecución**: `npm run dev` para iniciar el entorno de desarrollo con TypeScript.

---

**Desarrollado por:** Santiago Vadone - Estudiante de la TUP en UTN FRH.