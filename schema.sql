DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_Tracker_db;

USE employee_tracker_db;

CREATE TABLE Department(
    
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 name VARCHAR(30),
 PRIMARY KEY (id)

);


CREATE TABLE role(

 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 title VARCHAR(30),
 salary DECIMAL (9,2),
 department_id INT,
 PRIMARY KEY (id)
 FOREIGN KEY(department_id) REFERENCES department(id)

);


CREATE TABLE employee (

 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 firstName VARCHAR(30),
 lastName VARCHAR(30),   
 role_id INT NULL,
 manager_id INT NULL,
 PRIMARY KEY (id)
 FOREIGN KEY (role_id) REFERENCES role(id),
 FOREIGN KEY (manager_id) REFERENCES employee(id)


):