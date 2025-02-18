pip install flask
pip install mysql

Install sql complete package from https://dev.mysql.com/downloads/installer/
Use following or run synapticare.sql  
Create database synapticare
Use synapticare;

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

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- This links to the user in the `users` table
    medical_license_number VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    years_of_experience INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)  -- Links to the `users` table
);

CREATE TABLE user_doctor_association (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NULL,  -- This is only filled if the user is also a doctor
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);


CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique ID for each record
    medicine_name VARCHAR(255) NOT NULL,     -- Medicine name
    manufacturer VARCHAR(255) NOT NULL,      -- Manufacturer name
    salt VARCHAR(255) NOT NULL,              -- Salt composition
    pack_size VARCHAR(50),                   -- Pack size
    discounted_price DECIMAL(10, 2),         -- Discounted price
    original_price DECIMAL(10, 2),           -- Original price
    link TEXT                                -- Link to the medicine details
);


The below table is optional but at that time we are not using this
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


Go to db_connections.py in db_utils folder

 host="localhost",  
            user="root",  
            password="abc",  
            database="synapticare"  

and replace this acording to your rest will remain same you just have to change password, password you will use for your sql that you will create while setting sql

Then execute app.py





