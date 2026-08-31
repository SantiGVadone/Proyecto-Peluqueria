


CREATE TABLE business (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(100) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	inflow NUMERIC(10,2),
	outflow NUMERIC(10,2),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bonus (
	id SERIAL PRIMARY KEY,
	amount NUMERIC (10,2) NOT NULL,
	description TEXT,
	employee_id INTEGER REFERENCES employee(id)
);

CREATE TABlE employee (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
	email VARCHAR(60) UNIQUE,
	role VARCHAR(20) NOT NULL DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	commission NUMERIC(5,2),
	salary NUMERIC(10,2),
	--bonus_id INTEGER REFERENCES bonus(id), esto va en la tabla de bonus no aca
	business_id INTEGER REFERENCES business(id)
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    origin VARCHAR(10) NOT NULL DEFAULT 'Local',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	business_id INTEGER REFERENCES business(id)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
	business_id INTEGER REFERENCES business(id)
);


CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    employee_id INTEGER REFERENCES employee(id),
	service_id INTEGER REFERENCES services(id),
    date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    total_cost NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE records (
	id SERIAL PRIMARY KEY,
	client_id INTEGER REFERENCES clients(id),
	employee_id INTEGER REFERENCES employee(id),
	service_id INTEGER REFERENCES services(id),
	appointment_id INTEGER REFERENCES appointments(id),
	description TEXT NOT NULL,
	date TIMESTAMP NOT NULL
);

