// requirements
const db = require('../../db/connection');

// View All employees 
SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employees 
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.departments_id = departments.id
LEFT JOIN employees manager ON manager.id = employees.manager_id 



// Add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)

// Update employee role
UPDATE employees SET role_id = ?
WHERE id = ?

