 DROP TABLE IF EXISTS records CASCADE;
 DROP TABLE IF EXISTS appointments CASCADE;
 DROP TABLE IF EXISTS services CASCADE;
 DROP TABLE IF EXISTS clients CASCADE;
 DROP TABLE IF EXISTS bonus CASCADE;
 DROP TABLE IF EXISTS employee CASCADE;
 DROP TABLE IF EXISTS business CASCADE;

-- 1. Negocio (Raíz)
CREATE TABLE business (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    inflow NUMERIC(10,2) DEFAULT 0,
    outflow NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Empleados
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'EMPLOYEE',
    commission NUMERIC(5,2) DEFAULT 0,
    salary NUMERIC(10,2) DEFAULT 0,
    business_id INTEGER REFERENCES business(id) ON DELETE CASCADE DEFAULT NULL , -- Si cierra el local, se borra el empleado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bonus (Cascada total con empleado)
CREATE TABLE bonus (
    id SERIAL PRIMARY KEY,
    amount NUMERIC (10,2) NOT NULL,
    description TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	business_id INTEGER REFERENCES business(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES employee(id) ON DELETE CASCADE
);

-- 4. Clientes
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    origin VARCHAR(10) NOT NULL DEFAULT 'LOCAL',
    business_id INTEGER REFERENCES business(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Servicios
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    business_id INTEGER REFERENCES business(id) ON DELETE CASCADE
);

-- 6. Turnos (Appointments)
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    -- Aquí NO usamos CASCADE para proteger el historial financiero
    client_id INTEGER REFERENCES clients(id) ON DELETE RESTRICT, 
    employee_id INTEGER REFERENCES employee(id) ON DELETE RESTRICT,
    service_id INTEGER REFERENCES services(id) ON DELETE RESTRICT,
		business_id INTEGER REFERENCES business(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    total_cost NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Historial (Records)
CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    employee_id INTEGER REFERENCES employee(id),
    service_id INTEGER REFERENCES services(id),
	business_id INTEGER REFERENCES business(id) ON DELETE CASCADE,
    -- Cascada aquí es perfecto: si el turno se borra, la ficha vuela
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
	total_cost NUMERIC(10,2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--CAMBIANDO LAS COLUMNAS
ALTER TABLE appointments 
DROP COLUMN IF EXISTS end_time; -- Borramos la vieja si existe
ALTER TABLE appointments 
ADD COLUMN duration INTEGER NOT NULL DEFAULT 15;


