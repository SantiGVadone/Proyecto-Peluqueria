INSERT INTO business (name, location, phone, inflow, outflow) 
VALUES ('Corte & Estilo UTN', 'Calle Falsa 123, Buenos Aires', '+541144445555', 0, 0);

-- Un bonus por buen desempeño
INSERT INTO bonus (amount, description) 
VALUES (5000.00, 'Bono por productividad mensual');

-- El Jefe (Dueño)
INSERT INTO employee (name, lastname, phone, email, role, commission, salary, business_id)
VALUES ('Damián', 'García', '+549111234567', 'admin@pelu.com', 'admin', 0, 150000.00, 1);

-- Un Peluquero (Empleado) con el bonus_id 1
INSERT INTO employee (name, lastname, phone, email, role, commission, salary, bonus_id, business_id)
VALUES ('Julián', 'Pérez', '+549119876543', 'julian@pelu.com', 'employee', 15.0, 80000.00, 1, 1);

INSERT INTO clients (name, lastname, phone, origin, business_id)
VALUES ('Lionel', 'Messi', '+123456789', 'turista', 1);

INSERT INTO clients (name, lastname, phone, origin, business_id)
VALUES ('Enzo', 'Fernández', '+54911223344', 'local', 1);

INSERT INTO services (name,  description, business_id)
VALUES ('Corte de Barba', 'Recorte y perfilado con toalla caliente', 1);

INSERT INTO services (name,  description, business_id)
VALUES ('Corte Clásico', 'Corte tijera o máquina con lavado', 1);

-- Turno para Messi con Julián (Corte Clásico)
INSERT INTO appointments (client_id, employee_id, service_id, date, start_time, end_time, status, total_cost)
VALUES (1, 2, 2, '2026-02-25', '10:00:00', '10:45:00', 'pending', 3500.00);

-- Turno para Enzo con el Jefe (Corte de Barba)
INSERT INTO appointments (client_id, employee_id, service_id, date, start_time, end_time, status, total_cost)
VALUES (2, 1, 1, '2026-02-25', '11:00:00', '11:30:00', 'completed', 1500.00);

SELECT 
    a.date, 
    a.start_time, 
    c.name AS cliente, 
    e.name AS peluquero, 
    s.name AS servicio, 
    a.status
FROM appointments a
JOIN clients c ON a.client_id = c.id
JOIN employee e ON a.employee_id = e.id
JOIN services s ON a.service_id = s.id;
