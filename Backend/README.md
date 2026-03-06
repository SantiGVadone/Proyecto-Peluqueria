# 💈 Hair Salon Management System - API v1.0

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%tokens)

Sistema integral de gestión multitenant para peluquerías. Esta API garantiza el aislamiento total de datos entre diferentes negocios compartiendo una misma infraestructura.

---

## 🏗️ Arquitectura y Reglas de Dominio

El sistema implementa una jerarquía estricta para asegurar la integridad referencial y la seguridad de la información:

* **Entidad Raíz (Business)**: Es el eje del sistema. No existen empleados, clientes o servicios sin un `business_id` asociado.
* **Seguridad Multi-tenant**: El aislamiento se logra mediante filtros obligatorios `WHERE business_id = $n` en todas las consultas. El `business_id` se extrae directamente del JWT, impidiendo que un usuario acceda a datos de otro negocio.
* **Automatización de Ventas**: Se implementó un "Trigger de Servicio" que detecta cuando un turno cambia su estado a `COMPLETED` y genera automáticamente un registro inmutable en la tabla de `Records`.



---

## 🔐 Control de Acceso (RBAC)

| Módulo | Endpoint | ADMIN | BOSS | EMPLOYEE |
| :--- | :--- | :---: | :---: | :---: |
| **Auth** | `/auth/*` | ✅ | ✅ | ✅ |
| **Appointments** | `/appointments/*` | ✅ | ✅ | ✅ |
| **Business** | `/business/*` | ✅ | ✅ (Propio) | ❌ |
| **Employees** | `/employees/*` | ✅ | ✅ | ✅ (Propio) |
| **Bonus** | `/bonus/*` | ✅ | ✅ | ✅ (Solo ver) |
| **Records** | `/records/*` | ✅ | ✅ | ✅ |

---

## 📌 Endpoints Detallados

### 🔑 Autenticación & Registro
* `POST /auth/register-boss`: Creación atómica de Negocio + Usuario Jefe.
* `POST /auth/register-employee`: Registro de staff vinculado al negocio.
* `POST /auth/login`: Entrega de JWT con claims de `role` y `business_id`.

### 📅 Citas y Facturación
* `GET /appointments`: Agenda filtrada por negocio.
* `PATCH /appointments/:id`: Actualización de estado. **Acción Crítica**: Al completar el turno, se registra el cobro en `Records` de forma automática.
* `GET /records`: Historial contable inmutable por negocio, empleado o cliente.

### 💰 Gestión de Personal y Clientes
* `PATCH /employees/:id`: Gestión de salarios, comisiones y perfiles.
* `GET /clients`: Gestión de la cartera de clientes del negocio.
* `GET /bonus/employee/:id`: Seguimiento de incentivos para el staff.

---

## ⚙️ Configuración del Entorno

1.  **Instalación**: `npm install`
2.  **Variables de Entorno**: Configurar `.env` con credenciales de PostgreSQL y `JWT_SECRET`.
3.  **Base de Datos**: Ejecutar el script SQL de inicialización (Tablas: business, employee, clients, services, appointments, records, bonus).
4.  **Ejecución**: `npm run dev`

---

## 📝 Roadmap v2.0
- [ ] Validación de solapamiento de horarios (Time Collision).
- [ ] Implementación de Soft Delete para auditorías.
- [ ] Reportes estadísticos avanzados con gráficos.

**Desarrollado por:** Santiago Vadone - TUP | UTN FRH