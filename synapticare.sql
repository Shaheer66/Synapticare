CREATE DATABASE synapticare;
Use synapticare;


-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Store hashed passwords
    role ENUM('user', 'doctor') NOT NULL,  -- Role can be 'user' or 'doctor'
    is_verified BOOLEAN DEFAULT FALSE,  -- Whether the email is verified
    verification_code VARCHAR(50) NULL,  -- Temporary verification code for email verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create health_info table
CREATE TABLE health_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    allergic_medications TEXT,  -- Medications user is allergic to
    smoking_or_alcohol ENUM('Yes', 'No', 'Occasionally') NULL,  -- Smoking or alcohol use
    chronic_conditions TEXT,  -- Chronic or long-term health conditions
    adverse_reactions TEXT,  -- Adverse reactions to medications
    other_medications TEXT,  -- Other medications currently being taken
    pregnancy_status ENUM('Not Pregnant', 'Pregnant', 'Breastfeeding', 'Planning to Become Pregnant') NULL,  -- Pregnancy or breastfeeding status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Links to the `users` table
);

-- Create doctors table
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- This links to the user in the `users` table
    medical_license_number VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    years_of_experience INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Links to the `users` table
);

-- Create user_doctor_association table
CREATE TABLE user_doctor_association (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NULL,  -- This is only filled if the user is also a doctor
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Create medicine_data table (future use)
CREATE TABLE medicine_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,  -- Price of the medication
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_verification table (optional, for verification tracking)
CREATE TABLE user_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    verification_code VARCHAR(50) NOT NULL,  -- Code used to verify the user
    expiration TIMESTAMP NOT NULL,  -- Expiration time of the verification code
    verified BOOLEAN DEFAULT FALSE,  -- Flag to check if the email has been verified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
DELETE FROM users where phone_number='03351875959';
select * from users;