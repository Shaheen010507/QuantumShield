-- backend/database/schema.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    role TEXT NOT NULL,
    last_login TIMESTAMP
);--transactions table to log user transactions with fraud detection fields
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    transaction_type TEXT NOT NULL,

    device_id TEXT,
    ip_address TEXT,
    location TEXT,

    risk_score INTEGER,
    fraud_probability FLOAT,

    status TEXT CHECK (status IN ('ALLOWED', 'FLAGGED', 'BLOCKED')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
